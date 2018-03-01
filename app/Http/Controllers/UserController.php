<?php

namespace App\Http\Controllers;

use App\Http\Models\UserModel;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Providers\Auth\Illuminate;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Hmac\Sha256;

class UserController extends Controller
{
  public function __construct()
  {
    // middleware later;
  }

  public function Login(Request $request, Response $response)
  {
    $email = $request->input('email');
    $attemptedPassword = $request->input('password');

    if (($email == '') || ($attemptedPassword == '')) {
      return (
        new Response(
          '{"errorMessage": "One or more of the required parameters (email, password) are missing."}', 
          400
        )
      )->header('Content-Type', 'application/json');
    }

    $userObject = $this->FindUserByEmail($email);

    if (!$userObject) {
      return (
        new Response(
          '{"errorMessage": "A user with that email was not found."}', 
          404
        )
      )->header('Content-Type', 'application/json');
    }

    $attemptedPasswordHash = password_hash(
      $attemptedPassword,
      PASSWORD_BCRYPT,
      ['salt' => hash('sha256', env('APP_KEY'))]
    );

    if ($userObject['password'] !== $attemptedPasswordHash) {
      return (
        new Response(
          '{"errorMessage": "Password does not match email provided."}', 
          401
        )
      )->header('Content-Type', 'application/json');
    }

    $this->Tokenize($userObject);

    return (new Response(json_encode($userObject), 200))->header('Content-Type', 'application/json');
  }


  private function FindUserByEmail($email) 
  {
    return UserModel::where('email', '=', $email)->first();
  }

  private function Tokenize($userObject) {
    $signer = new Sha256();

    $token = (new Builder())
      ->setIssuer('http://example.com') // Configures the issuer (iss claim)
      ->setAudience('http://example.org') // Configures the audience (aud claim)
      ->setId('4f1g23a12aa', true) // Configures the id (jti claim), replicating as a header item
      ->setIssuedAt(time()) // Configures the time that the token was issue (iat claim)
      ->setNotBefore(time()) // Configures the time that the token can be used (nbf claim)
      ->setExpiration(time() + 3600) // Configures the expiration time of the token (exp claim)
      ->set('owner_id', $userObject->id)
      ->sign($signer, env("JWT_SECRET"))
      ->getToken();

    $userObject->token = (string)$token;
  }
}

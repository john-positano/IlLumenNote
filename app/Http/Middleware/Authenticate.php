<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\ValidationData;

class Authenticate
{
    protected $auth;

    public function __construct(Auth $auth)
    {
      $this->auth = $auth;
    }

    public function handle($request, Closure $next, $guard = null)
    {
      $bearer = $request->headers->get('authorization');
      if (
        !$bearer 
        || 
        (!preg_match('/Bearer/', $bearer))
      ) {
        return response(
          '{"errorMessage":"\'Authorization\' header or Authorized JWT Token is missing. e.g. \'Authorization\': \'Bearer ey8cS0g42gE0g9Sn5Z [...]\'"}', 
          401
        )->header('Content-Type', 'application/json');
      }

      try 
      {
        $token = (new Parser())
          ->parse(preg_split('/Bearer\ /', $bearer)[1]);
        $signer = new Sha256();
        $data = new ValidationData();
        $data->setCurrentTime(time());

        if(
          !($token->verify($signer, env("JWT_SECRET")))
          ||
          !($token->validate($data))
        ) {       
          throw new \Exception();
        }
      }
      catch (\Exception $e)
      {
        return response(
          '{"errorMessage":"Token Invalid."}', 
          401
        )->header('Content-Type', 'application/json'); 
      }

      return $next($request);
    }
}

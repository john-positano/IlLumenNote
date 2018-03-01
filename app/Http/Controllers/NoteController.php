<?php

namespace App\Http\Controllers;

use App\Http\Models\NoteModel;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\ValidationData;

class NoteController extends Controller
{
  public function __construct()
  {
    // middleware later;
  }

  public function getNotes(Request $request, Response $response) 
  {
    $token = $this->unwrapToken($request);
    return NoteModel::where([
      ['owner_id', '=', $token->getClaim('owner_id')],
      ['active', '=', 1]
    ])->join('users', 'users.id', '=', 'notes.owner_id')->get();
  }

  public function postNote(Request $request, Response $response) 
  {
    $token = $this->unwrapToken($request);
    $note_body = $request->input('note_body');

    if ($note_body == '') {
      return (
        new Response(
          '{"errorMessage": "Required parameter (note_body) is missing."}', 
          400
        )
      )->header('Content-Type', 'application/json');      
    }

    $note = new NoteModel;
    $note->owner_id = $token->getClaim('owner_id');
    $note->note_body = $request->input('note_body');

    $note->save();
  }

  public function putNote(Request $request, Response $response, $note_id) 
  {
    $token = $this->unwrapToken($request);
    $active = $request->input('active');
    $note_body = $request->input('note_body');

    if ($note_id == '') {
      return (
        new Response(
          '{"errorMessage": "Required parameter (note_id) is missing."}', 
          400
        )
      )->header('Content-Type', 'application/json');      
    }

    $note = NoteModel::where([
      ['owner_id', '=', $token->getClaim('owner_id')],
      ['id', '=', $note_id]
    ]);

    if ($active != '') { $note->update(['active' => $active]); }
    if ($note_body != '') { $note->update(['note_body' => $note_body]); }
  }

  public function deleteNote(Request $request, Response $response, $note_id)
  {
    $token = $this->unwrapToken($request);

    if ($note_id == '') {
      return (
        new Response(
          '{"errorMessage": "Required parameter (note_id) is missing."}', 
          400
        )
      )->header('Content-Type', 'application/json');      
    }

    $note = NoteModel::where([
      ['owner_id', '=', $token->getClaim('owner_id')],
      ['id', '=', $note_id]
    ]);

    $note->update(['active' => 0]);
  }

  private function unwrapToken(Request $request) 
  {
    $token = (new Parser())->parse(preg_split('/Bearer\ /', $request->headers->get('authorization'))[1]);
    $token->getClaims();
    $token->getHeaders();
    return $token;
  }
}

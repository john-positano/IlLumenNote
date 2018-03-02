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
    ])
    ->join('users', 'users.id', '=', 'notes.owner_id')
    ->select(
      'note_id',
      'note_title',
      'note_body',
      'owner_id',
      'notes.updated_at',
      'notes.created_at',
      'active',
      'name',
      'email'
    )
    ->get();
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
    $note->note_title = $request->input('note_title');

    $note->save();

    return NoteModel::where([
      ['owner_id', '=', $token->getClaim('owner_id')],
      ['note_id', '=', $note->id]
    ])
    ->join('users', 'users.id', '=', 'notes.owner_id')
    ->select(
      'note_id',
      'note_title',
      'note_body',
      'owner_id',
      'notes.updated_at',
      'notes.created_at',
      'active',
      'name',
      'email'
    )
    ->first();
  }

  public function putNote(Request $request, Response $response, $note_id) 
  {
    $token = $this->unwrapToken($request);
    $active = $request->input('active');
    $note_body = $request->input('note_body');
    $note_title = $request->input('note_title');

    if ($note_id == '') {
      return (
        new Response(
          '{"errorMessage": "Required parameter (note_id) is missing."}', 
          400
        )
      )->header('Content-Type', 'application/json');      
    }

    if ($active != '') { 
      NoteModel::where([
        ['owner_id', '=', $token->getClaim('owner_id')],
        ['note_id', '=', $note_id]
      ])->update(['active' => $active]);
    }

    if ($note_body != '') {
      NoteModel::where([
        ['owner_id', '=', $token->getClaim('owner_id')],
        ['note_id', '=', $note_id]
      ])->update(['note_body' => $note_body]);
    }

    if ($note_title != '') {
      NoteModel::where([
        ['owner_id', '=', $token->getClaim('owner_id')],
        ['note_id', '=', $note_id]       
      ])->update(['note_title' => $note_title]);
    }

    return NoteModel::where([
      ['owner_id', '=', $token->getClaim('owner_id')],
      ['note_id', '=', $note_id]
    ])
    ->join('users', 'users.id', '=', 'notes.owner_id')
    ->select(
      'note_id',
      'note_title',
      'note_body',
      'owner_id',
      'notes.updated_at',
      'notes.created_at',
      'active',
      'name',
      'email'
    )
    ->first();
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
      ['note_id', '=', $note_id]
    ])->update(['active' => false]);
  }

  private function unwrapToken(Request $request) 
  {
    $token = (new Parser())->parse(preg_split('/Bearer\ /', $request->headers->get('authorization'))[1]);
    $token->getClaims();
    $token->getHeaders();
    return $token;
  }
}

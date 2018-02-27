<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class NoteModel extends Model 
{
  public function __construct()
  {
    return $this;
  }

  protected $table = 'notes';

  public function email() {
    return $this->hasOne('note_body');
  }

  public function notes() {
    return $this->belongsToMany('App\Http\Models\UserModel');
  }
}
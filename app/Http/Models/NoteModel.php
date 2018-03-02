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
  protected $fillable = [
    'note_title',
    'note_body',
    'active'
  ];

  public function note_body() {
    return $this->hasOne('note_body');
  }

  public function owner_id() {
    return $this->hasOne('owner_id');
  }

  public function notes() {
    return $this->belongsToMany('App\Http\Models\UserModel');
  }

  public function active() {
    return $this->hasOne('active');
  }
}
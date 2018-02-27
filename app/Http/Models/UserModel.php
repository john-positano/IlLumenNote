<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class UserModel extends Model 
{
  public function __construct()
  {
    return $this;
  }

  protected $table = 'users';
  protected $appends = [
    'token'
  ];
  protected $hidden = [
    'password',
    'created_at',
    'updated_at'
  ];
  protected $visible = [
    'id',
    'name',
    'email',
    'token'
  ];

  public $token = '';

  public function email() {
    return $this->hasOne('email');
  }

  private function password() {
    return $this->hasOne('password');
  }

  public function notes() {
    return $this->hasMany('note');
  }

  public function getTokenAttribute() {
    return $this->token;  
  }

  public function setTokenAttribute($token) {
    $this->token = $token;
  }
}
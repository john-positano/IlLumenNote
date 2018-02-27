<?php

$dirname = dirname(__FILE__);

$app->get('/', function () use ($app, $dirname) {
  return file_get_contents($dirname."/../../public/views/index.html");
});

$app->post('/login', 'UserController@Login');

$app->group(['middleware' => 'auth'], function () use ($app) {
  $app->get('/dashboard', function () {
    return 1;
  });
});
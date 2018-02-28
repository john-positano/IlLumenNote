<?php

$dirname = dirname(__FILE__);

// Views

$app->get('/', function () use ($app, $dirname) {
  return file_get_contents($dirname."/../../public/views/index.html");
});

$app->get('/login', function ()  use ($app) {
  return redirect('/');
});

$app->group(['middleware' => 'auth'], function () use ($app) {
  $app->get('/private/dashboard', function () {
    return 1;
  });
});

// JSON

$app->post('/login', 'UserController@Login');
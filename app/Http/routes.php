<?php

$dirname = dirname(__FILE__);

// Views
$app->get('/', function () use ($dirname) {
  return file_get_contents($dirname."/../../public/views/index.html");
});

$app->get('/login', function () use ($dirname) { 
  return file_get_contents($dirname."/../../public/views/index.html"); 
});

$app->get('/app/{anything}', function () use ($dirname) { 
  return redirect('/');
});

$app->group(['middleware' => 'auth'], function () use ($app) {
  $app->get('/private/dashboard', function () {
    return view('Lumen.dashboard');
  });
});

// JSON
$app->post('/login', 'UserController@Login');
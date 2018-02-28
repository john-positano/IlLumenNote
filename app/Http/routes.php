<?php

$dirname = dirname(__FILE__);

// Views

$app->get('/', function () use ($app, $dirname) {
  return file_get_contents($dirname."/../../public/views/index.html");
});

$app->get('/login', function () { return redirect('/'); });

$app->get('/app/{anything}', function () { return redirect('/'); });

$app->group(['middleware' => 'auth'], function () use ($app) {
  $app->get('/private/dashboard', function () {
    return '<div> hi </div>';
  });
});

// JSON
$app->post('/login', 'UserController@Login');
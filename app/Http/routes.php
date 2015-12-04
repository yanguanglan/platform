<?php

Route::group(['namespace' => 'DEMO', 'prefix' => 'demo'], function () {
    resource('posts', 'PostsController', ['only' => ['index', 'show']]);
});

Route::group(['namespace' => 'API', 'prefix' => 'api'], function () {
    resource('recipes', 'RecipesController', ['only' => ['index', 'show']]);
    get('recipes-latest', 'RecipesController@latest');
    resource('series', 'SeriesController', ['only' => ['index', 'show']]);
    get('series-latest', 'SeriesController@latest');
    resource('lessons', 'LessonsController', ['only' => ['show']]);
    resource('topics', 'TopicsController', ['only' => ['index', 'show']]);
    resource('posts', 'PostsController', ['only' => ['index', 'show']]);
    post('auth/login', 'AuthController@login');
    get('auth/logout', 'AuthController@logout');
    get('users/account', 'UsersController@account');
    get('users/dashboard', 'UsersController@dashboard');
});

resource('recipes', 'RecipesController', ['only' => ['index', 'show']]);
resource('topics', 'TopicsController', ['only' => ['index', 'show']]);
resource('contact', 'ContactController', ['only' => ['store']]);
resource('newsletter', 'NewsletterController', ['only' => ['store']]);
get('error', ['as' => 'error', 'uses' => 'PagesController@error']);
get('/', ['as' => 'home', 'uses' => 'PagesController@home']);

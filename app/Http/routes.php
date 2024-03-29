<?php

Route::group(['namespace' => 'DEMO', 'prefix' => 'demo'], function () {
	resource('posts', 'PostsController', ['only' => ['index', 'show']]);
});

Route::group(['namespace' => 'API', 'prefix' => 'api'], function () {
	resource('recipes', 'RecipesController', ['only' => ['index', 'show', 'store']]);
	get('recipes-latest', 'RecipesController@latest');
	get('recipes-stats', 'RecipesController@stats');
	post('recipes-like', 'RecipesController@like');
	post('recipes-dislike', 'RecipesController@dislike');
	post('recipes-book', 'RecipesController@book');
	post('recipes-unbook', 'RecipesController@unbook');

	resource('series', 'SeriesController', ['only' => ['index', 'show']]);
	get('series-latest', 'SeriesController@latest');
	post('series-like', 'SeriesController@like');
	post('series-dislike', 'SeriesController@dislike');
	post('series-book', 'SeriesController@book');
	post('series-unbook', 'SeriesController@unbook');

	resource('themes', 'ThemesController', ['only' => ['index']]);
	post('themes-vote', 'ThemesController@vote');

	resource('lessons', 'LessonsController', ['only' => ['show']]);

	resource('topics', 'TopicsController', ['only' => ['index', 'show']]);
	get('topics-list', 'TopicsController@getList');

	resource('posts', 'PostsController', ['only' => ['index', 'show']]);

	post('auth/login', 'AuthController@login');
	post('auth/register', 'AuthController@register');
	get('auth/users-availability', 'AuthController@availability');
	resource('users', 'UsersController', ['only' => ['update']]);
	put('users/update/password/{users}', 'UsersController@updatePassword');
	post('users/request/password', 'UsersController@requestPassword');
	put('users/reset/password', 'UsersController@resetPassword');
	get('users/account', 'UsersController@account');
	get('users/dashboard', 'UsersController@dashboard');
});

get('preview/{category}/{template}', 'EmailsController@preview');
resource('recipes', 'RecipesController', ['only' => ['index', 'show']]);
resource('topics', 'TopicsController', ['only' => ['index', 'show']]);
resource('contact', 'ContactController', ['only' => ['store']]);
resource('newsletter', 'NewsletterController', ['only' => ['store']]);
get('error', ['as' => 'error', 'uses' => 'PagesController@error']);
get('/', ['as' => 'home', 'uses' => 'PagesController@home']);

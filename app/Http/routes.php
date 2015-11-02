<?php

Route::group(['namespace' => 'API', 'prefix' => 'api'], function() {
	resource('recipes', 'RecipesController', ['only' => ['index', 'show']]);
	resource('topics', 'TopicsController', ['only' => ['index', 'show']]);
	resource('posts', 'PostsController', ['only' => ['index', 'show']]);
});

resource('recipes', 'RecipesController', ['only' => ['index', 'show']]);
resource('topics', 'TopicsController', ['only' => ['index', 'show']]);
resource('contact', 'ContactController', ['only' => ['store']]);
resource('newsletter', 'NewsletterController', ['only' => ['store']]);
get('error', ['as' => 'error', 'uses' => 'PagesController@error']);
get('/', ['as' => 'home', 'uses' => 'PagesController@home']);

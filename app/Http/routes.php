<?php

Route::resource('recipes', 'RecipesController', ['only' => ['index', 'show']]);
Route::resource('blog', 'BlogController', ['only' => ['index', 'show']]);
Route::resource('topics', 'TopicsController', ['only' => ['index', 'show']]);
Route::resource('contact', 'ContactController', ['only' => ['store']]);
Route::resource('newsletter', 'NewsletterController', ['only' => ['store']]);
Route::get('/', ['as' => 'home', 'uses' => 'PagesController@home']);
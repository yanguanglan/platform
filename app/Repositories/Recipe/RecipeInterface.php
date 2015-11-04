<?php namespace App\Repositories\Recipe;


interface RecipeInterface {

	public function index($sortBy);

	public function show($uuid);

}

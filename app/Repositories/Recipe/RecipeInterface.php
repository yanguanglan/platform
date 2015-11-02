<?php namespace App\Repositories\Recipe;


interface RecipeInterface {

	public function index();

	public function show($uuid);

}

<?php namespace App\Repositories\Recipe;


interface RecipeInterface {

	public function index($sortBy, $versionBy);

	public function latest();

	public function show($uuid);

	public function updateViews($uuid);

}

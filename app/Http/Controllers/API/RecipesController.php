<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Recipe\RecipeInterface as Recipe;
use JWTAuth;

class RecipesController extends Controller
{
	protected $recipe;

	public function __construct(Recipe $recipe)
	{
		$this->recipe = $recipe;
		$this->middleware('jwt.auth', ['only' => ['like', 'dislike', 'book', 'unbook']]);
	}

	public function index(Request $request)
	{
		$sortBy = $request->has('sortBy') ? $request->input('sortBy') : null;
		$versionBy = $request->has('versionBy') ? $request->input('versionBy') : null;

		return $this->recipe->index($sortBy, $versionBy);
	}

	public function latest()
	{
		return $this->recipe->latest();
	}

	public function show(Request $request, $uuid)
	{
		if ($request->has('views')) {
			$this->recipe->updateViews($uuid);
		}

		return $this->recipe->show($uuid);
	}

	public function like(Request $request)
	{
		$inputs =  $request->only('recipe_id');

		$user = self::getUser();

		$user->likedRecipes()->attach($inputs['recipe_id']);
	}

	public function dislike(Request $request)
	{
		$inputs =  $request->only('recipe_id');

		$user = self::getUser();

		$user->likedRecipes()->detach($inputs['recipe_id']);
	}

	public function book(Request $request)
	{
		$inputs =  $request->only('recipe_id');

		$user = self::getUser();

		$user->bookmarkedRecipes()->attach($inputs['recipe_id']);
	}

	public function unbook(Request $request)
	{
		$inputs =  $request->only('recipe_id');

		$user = self::getUser();

		$user->bookmarkedRecipes()->detach($inputs['recipe_id']);
	}

	private function getUser()
	{
		return JWTAuth::parseToken()->authenticate();
	}
}

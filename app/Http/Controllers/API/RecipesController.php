<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Recipe\RecipeInterface as Recipe;
use App\Repositories\User\UserInterface as User;

class RecipesController extends Controller
{
	protected $recipe;
	protected $user;

	public function __construct(Recipe $recipe, User $user)
	{
		$this->recipe = $recipe;
		$this->user = $user;
		$this->middleware('jwt.auth');
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
		$inputs =  $request->only('user_id', 'recipe_id');

		$user = $this->user->byId($inputs['user_id']);

		$user->likedRecipes()->attach($inputs['recipe_id']);
	}

	public function dislike(Request $request)
	{
		$inputs =  $request->only('user_id', 'recipe_id');

		$user = $this->user->byId($inputs['user_id']);

		$user->likedRecipes()->detach($inputs['recipe_id']);
	}

	public function book(Request $request)
	{
		$inputs =  $request->only('user_id', 'recipe_id');

		$user = $this->user->byId($inputs['user_id']);

		$user->bookmarkedRecipes()->attach($inputs['recipe_id']);
	}

	public function unbook(Request $request)
	{
		$inputs =  $request->only('user_id', 'recipe_id');

		$user = $this->user->byId($inputs['user_id']);

		$user->bookmarkedRecipes()->detach($inputs['recipe_id']);
	}
}

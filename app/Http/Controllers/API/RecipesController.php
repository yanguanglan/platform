<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests\Recipe\CreateRequest;
use App\Http\Controllers\Controller;
use App\Repositories\User\UserInterface as User;
use App\Repositories\Recipe\RecipeInterface as Recipe;
use JWTAuth;

class RecipesController extends Controller
{
	protected $user;
	protected $recipe;

	public function __construct(User $user, Recipe $recipe)
	{
		$this->user = $user;
		$this->recipe = $recipe;
		$this->middleware('jwt.auth', ['only' => ['store', 'like', 'dislike', 'book', 'unbook']]);
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

			if ($user = $this->user->getAuth()) {
				$recipe = $this->recipe->byAttribute('uuid', $uuid);

				$user->watchedRecipes()->attach($recipe->id);
			}
		}

		return $this->recipe->show($uuid);
	}

	public function store(CreateRequest $request)
	{
		$input = $request->only('title', 'content', 'user_id', 'release', 'version');

		$data = [
			'uuid' => str_random(6),
			'title' => $input['title'],
			'slug' => str_slug($input['title']),
			'content' => $input['content'],
			'content_converted' => \Markdown::convertToHtml($input['content']),
			'user_id' => $input['user_id'],
			'version' => $input['version'],
			'release' => $input['release'] == 'AngularJS 1' ? 1 : 2
		];

		$this->recipe->create($data);

		event('recipe.creation', [['title' => $data['title']]]);

		return [
			'error' => false
		];
	}

	public function like(Request $request)
	{
		$inputs = $request->only('recipe_id');

		$user = $this->user->getAuth();

		$user->likedRecipes()->attach($inputs['recipe_id']);
	}

	public function dislike(Request $request)
	{
		$inputs =  $request->only('recipe_id');

		$user = $this->user->getAuth();

		$user->likedRecipes()->detach($inputs['recipe_id']);
	}

	public function book(Request $request)
	{
		$inputs =  $request->only('recipe_id');

		$user = $this->user->getAuth();

		$user->bookmarkedRecipes()->attach($inputs['recipe_id']);
	}

	public function unbook(Request $request)
	{
		$inputs =  $request->only('recipe_id');

		$user = $this->user->getAuth();

		$user->bookmarkedRecipes()->detach($inputs['recipe_id']);
	}
}

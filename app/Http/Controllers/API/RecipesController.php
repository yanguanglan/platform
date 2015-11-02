<?php namespace App\Http\Controllers\API;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Recipe\RecipeInterface as Recipe;

class RecipesController extends Controller {

	protected $recipe;

	public function __construct(Recipe $recipe)
	{
		$this->recipe = $recipe;
	}

	public function index()
	{
		$recipes = $this->recipe->index();

		return $recipes;
	}

	public function show($uuid)
	{
		$recipe = $this->recipe->show($uuid);

		return $recipe;
	}

}

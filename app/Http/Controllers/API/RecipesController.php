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

	public function index(Request $request)
	{
		$sortBy = $request->has('sortBy') ? $request->input('sortBy') : null;

		return $this->recipe->index($sortBy);
	}

	public function show(Request $request, $uuid)
	{
        if($request->has('views'))
        {
            $this->recipe->updateViews($uuid);
        }

		return $this->recipe->show($uuid);
	}

}

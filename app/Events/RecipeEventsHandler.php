<?php namespace App\Events;

use App\Repositories\Recipe\RecipeInterface as Recipe;
use Carbon\Carbon;

class RecipeEventsHandler {

	protected $recipe;

	public function __construct(Recipe $recipe)
	{
		$this->recipe = $recipe;
	}

	public function onRecipeCreation($event)
	{
		$recipe = $event;

		\Slack::to('#recipes')
		->attach([
			'text' => $recipe['title'],
			'pretext' => 'New recipe just submitted'
		])
		->send('Recipe creation');
	}

}

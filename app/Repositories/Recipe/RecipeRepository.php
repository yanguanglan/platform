<?php namespace App\Repositories\Recipe;

use App\Recipe;
use App\Repositories\AbstractRepository;

class RecipeRepository extends AbstractRepository implements RecipeInterface {

	protected $model;

	public function __construct(Recipe $model)
	{
		$this->model = $model;
	}
}
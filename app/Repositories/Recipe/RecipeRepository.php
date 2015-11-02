<?php namespace App\Repositories\Recipe;

use App\Recipe;
use App\Repositories\AbstractRepository;

class RecipeRepository extends AbstractRepository implements RecipeInterface {

	protected $model;

	public function __construct(Recipe $model)
	{
		$this->model = $model;
	}

	public function index()
	{
		$models = $this->model
		->with('topics')
		->orderBy('updated_at', 'desc')
		->get();

		return $models;
	}

	public function show($uuid)
	{
		$model = $this->model->where('uuid', $uuid)->first();

		return $model;
	}
}

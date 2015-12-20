<?php

namespace App\Repositories\Topic;

use App\Topic;
use App\Repositories\AbstractRepository;

class TopicRepository extends AbstractRepository implements TopicInterface
{
	protected $model;

	public function __construct(Topic $model)
	{
		$this->model = $model;
	}

	public function index()
	{
		$models = $this->model
		->has('recipes')
		->with('recipes')
		->orderBy('title')
		->get();

		return $models;
	}

	public function show($uuid, $sortBy = 'date', $versionBy = 'all')
	{
		if ($sortBy == 'date') {
			$sortBy = 'updated_at';
		}

		if ($versionBy == 'all')
		{
			if ($sortBy = 'likes')
			{
				$model = $this->model
				->where('uuid', $uuid)
				->with(['recipes.likes', 'recipes.bookings', 'recipes.watches', 'recipes.level', 'recipes.topics' => function ($q) {
					$q->orderBy('title');
				}])
				->firstOrFail();
			}
			else
			{
				$model = $this->model
				->where('uuid', $uuid)
				->with(['recipes.likes', 'recipes.bookings', 'recipes.watches', 'recipes.level', 'recipes.topics' => function ($q) {
					$q->orderBy('title');
				}])
				->with(['recipes' => function ($q) use ($sortBy) {
					$q->orderBy($sortBy, 'desc');
				}])
				->firstOrFail();
			}
		}
		else
		{
			if ($sortBy = 'likes')
			{
				$model = $this->model
				->where('uuid', $uuid)
				->with(['recipes.likes', 'recipes.bookings', 'recipes.watches', 'recipes.level', 'recipes.topics' => function ($q) {
					$q->orderBy('title');
				}])
				->with(['recipes' => function ($q) use ($sortBy, $versionBy) {
					$q->where('release', $versionBy);
				}])
				->firstOrFail();
			}
			else
			{
				$model = $this->model
				->where('uuid', $uuid)
				->with(['recipes.likes', 'recipes.bookings', 'recipes.watches', 'recipes.level', 'recipes.topics' => function ($q) {
					$q->orderBy('title');
				}])
				->with(['recipes' => function ($q) use ($sortBy, $versionBy) {
					$q->where('release', $versionBy)->orderBy($sortBy, 'desc');
				}])
				->firstOrFail();
			}
		}

		foreach($model->recipes as $recipe) {
			$recipe->likesArray = $recipe->likes->fetch('id');
			$recipe->bookedArray = $recipe->bookings->fetch('id');
			$recipe->watchedArray = $recipe->watches->fetch('id');
		}

		return $model;
	}
}

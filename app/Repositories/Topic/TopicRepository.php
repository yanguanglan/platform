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

	public function index($versionBy = 'all')
	{
		if ($versionBy == 'all')
		{
			$models = $this->model
			->has('recipes')
			->with(['recipes' => function($q) {
				$q->where('published', 1);
			}])
			->orderBy('title')
			->get();
		}
		else
		{
			$models = $this->model
			->has('recipes')
			->where('release', $versionBy)
			->with(['recipes' => function($q) {
				$q->where('published', 1);
			}])
			->orderBy('title')
			->get();
		}

		return $models;
	}

	public function show($uuid, $sortBy = 'date', $versionBy = 'all')
	{
		if ($sortBy == 'date') {
			$sortBy = 'created_at';
		}

		if ($versionBy == 'all')
		{
			if ($sortBy == 'likes')
			{
				$model = $this->model
				->where('uuid', $uuid)
				->with(['recipes.likes', 'recipes.bookings', 'recipes.watches', 'recipes.topics' => function ($q) {
					$q->orderBy('title');
				}])
				->with(['recipes' => function($q) {
					$q->where('published', 1);
				}])
				->firstOrFail();

				$recipes = $model->recipes->sortByDesc(function($recipe) {
					return $recipe->likes->count();
				})->values();

				unset($model->recipes);

				$model->recipes = $recipes;
			}
			else
			{
				$model = $this->model
				->where('uuid', $uuid)
				->with(['recipes.likes', 'recipes.bookings', 'recipes.watches', 'recipes.topics' => function ($q) {
					$q->orderBy('title');
				}])
				->with(['recipes' => function ($q) use ($sortBy) {
					$q->where('published', 1)->orderBy($sortBy, 'desc');
				}])
				->firstOrFail();
			}
		}
		else
		{
			if ($sortBy == 'likes')
			{
				$model = $this->model
				->where('uuid', $uuid)
				->with(['recipes.likes', 'recipes.bookings', 'recipes.watches', 'recipes.topics' => function ($q) {
					$q->orderBy('title');
				}])
				->with(['recipes' => function ($q) use ($versionBy) {
					$q->where('published', 1)->where('release', $versionBy);
				}])
				->firstOrFail();

				$recipes = $model->recipes->sortByDesc(function($recipe) {
					return $recipe->likes->count();
				});

				unset($model->recipes);

				$model->recipes = $recipes;
			}
			else
			{
				$model = $this->model
				->where('uuid', $uuid)
				->with(['recipes.likes', 'recipes.bookings', 'recipes.watches', 'recipes.topics' => function ($q) {
					$q->orderBy('title');
				}])
				->with(['recipes' => function ($q) use ($sortBy, $versionBy) {
					$q->where('published', 1)->where('release', $versionBy)->orderBy($sortBy, 'desc');
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

	public function getList()
	{
		$models = $this->model
		->orderBy('title')
		->lists('title');

		return $models;
	}
}

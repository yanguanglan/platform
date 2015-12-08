<?php

namespace App\Repositories\Recipe;

use App\Recipe;
use App\Repositories\AbstractRepository;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class RecipeRepository extends AbstractRepository implements RecipeInterface
{
	protected $model;

	public function __construct(Recipe $model)
	{
		$this->model = $model;
	}

	public function index($sortBy = 'date', $versionBy = 'all')
	{
		if ($versionBy == 'all')
		{
			$models = $this->model
			->with(['likes', 'bookings', 'watches', 'level', 'topics' => function ($q) {
				$q->orderBy('title');
			}])
			->get();
		}
		else
		{
			$models = $this->model
			->where('release', $versionBy)
			->with(['likes', 'bookings', 'watches', 'level', 'topics' => function ($q) {
				$q->orderBy('title');
			}])
			->get();
		}

		foreach($models as $model) {
			$model->likesArray = $model->likes->fetch('id');
			$model->bookedArray = $model->bookings->fetch('id');
			$model->watchedArray = $model->watches->fetch('id');
		}

		if ($sortBy == 'date') {
			return $models->sortByDesc('updated_at')->values();
		} elseif ($sortBy == 'views') {
			return $models->sortByDesc('views')->values();
		} elseif ($sortBy == 'likes') {
			return $models->sortByDesc('likes')->values();
		} else {
			return $models->sortByDesc('updated_at')->values();
		}
	}

	public function latest()
	{
		$models = $this->model
		->with(['likes', 'bookings', 'watches', 'level', 'topics' => function ($q) {
			$q->orderBy('title');
		}])
		->orderBy('updated_at', 'desc')
		->take(3)
		->get();

		foreach($models as $model) {
			$model->likesArray = $model->likes->fetch('id');
			$model->bookedArray = $model->bookings->fetch('id');
			$model->watchedArray = $model->watches->fetch('id');
		}

		return $models;
	}

	public function show($uuid)
	{
		$model = $this->model
		->where('uuid', $uuid)
		->with(['likes', 'bookings', 'watches', 'exercises', 'level', 'resources' => function ($q) {
			$q->orderBy('title');
		}])
		->firstOrFail();

		$model->likesArray = $model->likes->fetch('id');
		$model->bookedArray = $model->bookings->fetch('id');
		$model->watchedArray = $model->watches->fetch('id');

		return $model;
	}

	public function updateViews($uuid)
	{
		return \DB::table('recipes')
		->where('uuid', $uuid)
		->increment('views');
	}
}

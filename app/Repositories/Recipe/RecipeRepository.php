<?php

namespace App\Repositories\Recipe;

use App\Recipe;
use App\Repositories\AbstractRepository;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Carbon\Carbon;

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
			->where('published', 1)
			->with(['likes', 'bookings', 'watches', 'topics' => function ($q) {
				$q->orderBy('title');
			}])
			->get();
		}
		else
		{
			$models = $this->model
			->where('published', 1)
			->where('release', $versionBy)
			->with(['likes', 'bookings', 'watches', 'topics' => function ($q) {
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
			return $models->sortByDesc('created_at')->values();
		} elseif ($sortBy == 'views') {
			return $models->sortByDesc('views')->values();
		} elseif ($sortBy == 'likes') {
			return $models->sortByDesc('likes')->values();
		} else {
			return $models->sortByDesc('created_at')->values();
		}
	}

	public function latest()
	{
		$models = $this->model
		->where('published', 1)
		->with(['likes', 'bookings', 'watches', 'topics' => function ($q) {
			$q->orderBy('title');
		}])
		->orderBy('created_at', 'desc')
		->take(3)
		->get();

		foreach($models as $model) {
			$model->likesArray = $model->likes->fetch('id');
			$model->bookedArray = $model->bookings->fetch('id');
			$model->watchedArray = $model->watches->fetch('id');
		}

		return $models;
	}

	public function stats()
	{
		// $models = $this->model
		// ->select(\DB::raw('*, count(*) as count, title, Month(created_at) as month, Year(created_at) as year'))
		// ->groupBy('release')
		// ->groupBy('year')
		// ->groupBy('month')
		// ->get();
        //
		// $data = collect();
        //
		// foreach ($models as $model) {
		// 	$data->push([
		// 		'month' => $model->month,
		// 		'year' => $model->year,
		// 		'release' => $model->release,
		// 		'count' => $model->count
		// 	]);
		// }

		// return $data;

		$v1 = $this->model
		->where('release', 1)
		->get();

		$v2 = $this->model
		->where('release', 2)
		->get();

		return compact('v1', 'v2');
	}

	public function show($uuid)
	{
		$model = $this->model
		->where('published', 1)
		->where('uuid', $uuid)
		->with(['likes', 'bookings', 'watches', 'exercises', 'resources' => function ($q) {
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

	public function createContent()
	{
		$models = $this->model->all();

		foreach ($models as $model) {
			$model->update(['content_converted' => \Markdown::convertToHtml($model->content)]);
		}
	}
}

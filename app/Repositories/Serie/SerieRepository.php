<?php

namespace App\Repositories\Serie;

use App\Serie;
use App\Repositories\AbstractRepository;

class SerieRepository extends AbstractRepository implements SerieInterface
{
	protected $model;

	public function __construct(Serie $model)
	{
		$this->model = $model;
	}

	public function index($sortBy = 'date', $versionBy = 'all')
	{
		if ($versionBy == 'all')
		{
			$models = $this->model
			->where('published', 1)
			->with(['likes', 'bookings', 'watches', 'lessons'])
			->get();
		}
		else
		{
			$models = $this->model
			->where('published', 1)
			->where('release', $versionBy)
			->with(['likes', 'bookings', 'watches', 'lessons'])
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
		->where('published', 1)
		->with(['likes', 'bookings', 'watches', 'lessons'])
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
		->with(['likes', 'bookings', 'watches', 'lessons' => function($q){
			$q->orderBy('order');
		}])
		->firstOrFail();

		$model->likesArray = $model->likes->fetch('id');
		$model->bookedArray = $model->bookings->fetch('id');
		$model->watchedArray = $model->watches->fetch('id');

		return $model;
	}

	public function updateViews($uuid)
	{
		return \DB::table('series')
		->where('uuid', $uuid)
		->increment('views');
	}
}

<?php namespace App\Repositories\Topic;

use App\Topic;
use App\Repositories\AbstractRepository;

class TopicRepository extends AbstractRepository implements TopicInterface {

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

	public function show($uuid)
	{
		$model = $this->model
		->where('uuid', $uuid)
		->with(['recipes.topics' =>function($q) {
			$q->orderBy('title');
		}])
		->firstOrFail();

		return $model;
	}
}

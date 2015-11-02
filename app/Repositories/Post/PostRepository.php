<?php namespace App\Repositories\Post;

use App\Post;
use App\Repositories\AbstractRepository;

class PostRepository extends AbstractRepository implements PostInterface {

	protected $model;

	public function __construct(Post $model)
	{
		$this->model = $model;
	}

	public function index($take)
	{
		$models = $this->model->orderBy('updated_at', 'desc')->get();

		return $take ? $models->take($take) : $models;
	}

	public function show($uuid)
	{
		$model = $this->model->where('uuid', $uuid)->first();

		return $model;
	}
}

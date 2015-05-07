<?php namespace App\Repositories\Blog;

use App\Blog;
use App\Repositories\AbstractRepository;

class BlogRepository extends AbstractRepository implements BlogInterface {

	protected $model;

	public function __construct(Blog $model)
	{
		$this->model = $model;
	}
}
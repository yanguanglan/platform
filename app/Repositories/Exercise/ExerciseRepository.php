<?php namespace App\Repositories\Exercise;

use App\Exercise;
use App\Repositories\AbstractRepository;

class ExerciseRepository extends AbstractRepository implements ExerciseInterface {

	protected $model;

	public function __construct(Exercise $model)
	{
		$this->model = $model;
	}
}

<?php namespace App\Repositories\User;

use App\User;
use App\Repositories\AbstractRepository;

class UserRepository extends AbstractRepository implements UserInterface {

	protected $model;

	public function __construct(User $model)
	{
		$this->model = $model;
	}
}

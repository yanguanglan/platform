<?php

namespace App\Repositories\User;

use App\User;
use App\Repositories\AbstractRepository;

class UserRepository extends AbstractRepository implements UserInterface
{
	protected $model;

	public function __construct(User $model)
	{
		$this->model = $model;
	}

	public function exists($email)
	{
		$model = $this->model
		->where('email', $email)
		->first();

		return $model ? true : false;
	}

	public function session($id)
	{
		$model = $this->model
		->with(['likedRecipes.topics', 'bookmarkedRecipes.topics'])
		->findOrFail($id);

		return $model;
	}

	public function account($id)
	{
		$model = $this->model
		->findOrFail($id);

		return $model;
	}

	public function dashboard($id)
	{
		$model = $this->model
		->with(['likedRecipes.likes', 'likedRecipes.topics', 'bookmarkedRecipes.topics', 'bookmarkedRecipes.likes'])
		->findOrFail($id);

		$model->likedRecipesArray = $model->likedRecipes->fetch('id');
		$model->bookmarkedRecipesArray = $model->bookmarkedRecipes->fetch('id');

		return $model;
	}
}

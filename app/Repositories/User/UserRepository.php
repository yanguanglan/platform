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
		->with(['likedRecipes.likes', 'likedRecipes.bookings', 'likedRecipes.topics', 'bookmarkedRecipes.topics', 'bookmarkedRecipes.likes', 'bookmarkedRecipes.bookings'])
		->findOrFail($id);

		foreach($model->likedRecipes as $recipe) {
			$recipe->likesArray = $recipe->likes->fetch('id');
			$recipe->bookedArray = $recipe->bookings->fetch('id');
		}

		foreach($model->bookmarkedRecipes as $recipe) {
			$recipe->likesArray = $recipe->likes->fetch('id');
			$recipe->bookedArray = $recipe->bookings->fetch('id');
		}

		return $model;
	}
}

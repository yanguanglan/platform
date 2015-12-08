<?php

namespace App\Repositories\User;

use App\User;
use App\Repositories\AbstractRepository;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserRepository extends AbstractRepository implements UserInterface
{
	protected $model;

	public function __construct(User $model)
	{
		$this->model = $model;
	}

	public function getAuth()
	{
		try {
			$user = JWTAuth::parseToken()->authenticate();
		} catch (JWTException $e) {
			return false;
		}

		return $user;
	}

	public function exists($email)
	{
		$model = $this->model
		->where('email', $email)
		->first();

		return $model ? true : false;
	}

	public function account()
	{
		$auth_id = static::getAuth()->id;

		$model = $this->model
		->findOrFail($auth_id);

		return $model;
	}

	public function dashboard()
	{
		$auth_id = static::getAuth()->id;

		$model = $this->model
		->with(['likedRecipes.likes', 'likedRecipes.bookings', 'likedRecipes.watches', 'likedRecipes.topics', 'bookmarkedRecipes.topics', 'bookmarkedRecipes.likes', 'bookmarkedRecipes.bookings', 'bookmarkedRecipes.watches'])
		->findOrFail($auth_id);

		foreach($model->likedRecipes as $recipe) {
			$recipe->likesArray = $recipe->likes->fetch('id');
			$recipe->bookedArray = $recipe->bookings->fetch('id');
			$recipe->watchedArray = $recipe->watches->fetch('id');
		}

		foreach($model->bookmarkedRecipes as $recipe) {
			$recipe->likesArray = $recipe->likes->fetch('id');
			$recipe->bookedArray = $recipe->bookings->fetch('id');
			$recipe->watchedArray = $recipe->watches->fetch('id');
		}

		return $model;
	}
}

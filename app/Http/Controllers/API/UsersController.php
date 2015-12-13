<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Requests\User\UpdatePasswordRequest;
use App\Http\Controllers\Controller;
use App\Repositories\User\UserInterface as User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UsersController extends Controller
{
	protected $user;

	public function __construct(User $user)
	{
		$this->user = $user;
		$this->middleware('jwt.auth');
	}

	public function dashboard()
	{
		return ['user' => $this->user->dashboard()];
	}

	public function account()
	{
		return ['user' => null];
	}

	public function update(UpdateRequest $request, $id)
	{
		$this->user->update($id, [
			'name' => $request->input('name'),
			'email' => $request->input('email')
		]);

		return $this->user->byId($id);
	}

	public function updatePassword(UpdatePasswordRequest $request, $id)
	{
		$this->user->update($id, [
			'password' => $request->input('password')
		]);

		return $this->user->byId($id);
	}
}

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
		$this->middleware('jwt.auth', ['except' => ['requestPassword']]);
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

		$user = $this->user->byId($id);

		\Mail::send(['text' => 'emails.user.password_announce'], ['user' => $user], function ($m) use ($user) {
			$m->from('no-reply@angularjs-recipes.com', 'AngularJS Recipes');

			$m->to($user->email, $user->name)->subject('Password Updated');
		});

		return $user;
	}

	public function requestPassword(Request $request)
	{
		$user = $this->user->byAttribute('email', $request->input('email'));

		if ($user) {
			\Mail::send(['text' => 'emails.user.password_request'], ['user' => $user], function ($m) use ($user) {
				$m->from('no-reply@angularjs-recipes.com', 'AngularJS Recipes');

				$m->to($user->email, $user->name)->subject('Password Reset');
			});
		}
	}
}

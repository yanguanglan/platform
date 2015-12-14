<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests\User\RegisterRequest;
use App\Http\Requests\User\AvailabilityRequest;
use App\Http\Controllers\Controller;
use App\Repositories\User\UserInterface as User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
	protected $user;

	public function __construct(User $user)
	{
		$this->user = $user;
	}

	public function login(Request $request)
	{
		$credentials = $request->only('email', 'password');

		try {
			// verify the credentials and create a token for the user
			if (!$token = JWTAuth::attempt($credentials)) {
				return response()->json(['error' => true, 'msg' => 'Please enter valid credentials'], 401);
			}
		} catch (JWTException $e) {
			// something went wrong
			return response()->json(['error' => true, 'msg' => 'Please enter valid credentials'], 500);
		}

		// if no errors are encountered we can return a JWT
		return [
			'token' => $token,
			'user' => \Auth::user(),
		];
	}

	public function register(RegisterRequest $request)
	{
		$credentials = $request->only('name', 'email', 'password');

		$user = $this->user->create(array_add($credentials, 'uuid', str_random(6)));

		try {
			// verify the credentials and create a token for the user
			if (!$token = JWTAuth::attempt($credentials)) {
				return response()->json(['error' => 'Please enter valid credentials'], 401);
			}
		} catch (JWTException $e) {
			// something went wrong
			return response()->json(['error' => 'Please enter valid credentials'], 500);
		}

		$user = $this->user->byId(\Auth::id());

		\Mail::send(['text' => 'emails.user.register'], ['user' => $user], function ($m) use ($user) {
			$m->from('no-reply@angularjs-recipes.com', 'AngularJS Recipes');

			$m->to($user->email, $user->name)->subject('Welcome to AngularJS Recipes');
		});

		return [
			'token' => $token,
			'user' => $user
		];
	}

	public function availability(AvailabilityRequest $request)
	{
		return ['error' => $this->user->exists($request->only('email')) ? true : false];
	}
}

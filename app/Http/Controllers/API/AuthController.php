<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
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
			if (! $token = JWTAuth::attempt($credentials)) {
				return response()->json(['error' => 'invalid_credentials'], 401);
			}
		} catch (JWTException $e) {
			// something went wrong
			return response()->json(['error' => 'could_not_create_token'], 500);
		}

		// if no errors are encountered we can return a JWT
		return [
			'token' => $token,
			'user' => \Auth::user()
		];
	}

	public function register(Request $request)
	{
		$credentials = $request->only('name', 'email', 'password');

		$user = $this->user->create($credentials);

		try {
			// verify the credentials and create a token for the user
			if (! $token = JWTAuth::attempt($credentials)) {
				return response()->json(['error' => 'invalid_credentials'], 401);
			}
		} catch (JWTException $e) {
			// something went wrong
			return response()->json(['error' => 'could_not_create_token'], 500);
		}

		// if no errors are encountered we can return a JWT
		return [
			'token' => $token,
			'user' => \Auth::user()
		];
	}
}
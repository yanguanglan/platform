<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Requests\User\UpdatePasswordRequest;
use App\Http\Controllers\Controller;
use App\Repositories\User\UserInterface as User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Carbon\Carbon;

class UsersController extends Controller
{
	protected $user;

	public function __construct(User $user)
	{
		$this->user = $user;
		$this->middleware('jwt.auth', ['except' => ['requestPassword', 'resetPassword']]);
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
			$m->from(config('mail.from.address'), config('mail.from.name'));

			$m->to($user->email, $user->name)->subject('Password Updated');
		});

		return $user;
	}

	public function requestPassword(Request $request)
	{
		$user = $this->user->byAttribute('email', $request->input('email'));
		$token = str_random(60);
		$link = url('/#!/reset/' . $user->uuid . '/' . $token);

		if ($user) {
			$this->user->update($user->id, [
				'token' => $token,
				'expires_at' => Carbon::now()->addHour()
			]);

			\Mail::send(['text' => 'emails.user.password_request'], ['user' => $user, 'link' => $link], function ($m) use ($user) {
				$m->from(config('mail.from.address'), config('mail.from.name'));

				$m->to($user->email, $user->name)->subject('Password Reset');
			});
		}
	}

	public function resetPassword(Request $request)
	{
		$user = $this->user->byToken($request->input('uuid'), $request->input('token'));

		if ($user) {
			$diff = Carbon::now()->diffInMinutes($user->expires_at);

			if ($diff > 0) {
				$this->user->update($user->id, ['password' => $request->input('password')]);

				return [
					'error' => false,
					'user' => $user
				];
			}
		}

		return [
			'error' => true,
			'msg' => 'Invalid request, please go to the forgot password page again!'
		];
	}
}

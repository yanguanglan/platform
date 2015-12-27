<?php namespace App\Events;

use App\Repositories\User\UserInterface as User;
use Carbon\Carbon;

class UserEventsHandler {

	protected $user;

	public function __construct(User $user)
	{
		$this->user = $user;
	}

	public function onUserLogin($event)
	{
		$user = $event;

		$this->user->update($user->id, ['last_login' => Carbon::now()]);
	}

	public function onUserRegister($event)
	{
		$user = $event;

		\Mail::queue(['html' => 'emails.user.register'], ['user' => $user], function ($m) use ($user) {
			$m->from(config('mail.from.address'), config('mail.from.name'));

			$m->to($user->email, $user->name)->subject('Welcome to AngularJS Recipes');
		});
	}

	public function onUserPasswordUpdate($event)
	{
		$user = $event;

		\Mail::queue(['html' => 'emails.user.password_announce'], ['user' => $user], function ($m) use ($user) {
			$m->from(config('mail.from.address'), config('mail.from.name'));

			$m->to($user->email, $user->name)->subject('Password Update');
		});
	}

	public function onUserPasswordReset($event)
	{
		$user = $event['user'];
		$link = $event['link'];

		\Mail::queue(['html' => 'emails.user.password_request'], ['user' => $user, 'link' => $link], function ($m) use ($user) {
			$m->from(config('mail.from.address'), config('mail.from.name'));

			$m->to($user->email, $user->name)->subject('Password Reset');
		});
	}

}

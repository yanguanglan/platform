<?php namespace App\Repositories\User;


interface UserInterface {

	public function getAuth();

	public function exists($email);

	public function account();

	public function dashboard();

	public function byToken($uuid, $token);

}

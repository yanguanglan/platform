<?php namespace App\Repositories\Post;


interface PostInterface {

	public function index($take);

	public function show($uuid);

}

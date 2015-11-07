<?php namespace App\Http\Controllers\DEMO;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostsController extends Controller {

	protected $posts;

	public function __construct()
	{
		$this->posts = [
			[
				"id" => 1,
				"title" => "Post's Title",
				"body" => "Post's Content"
			],
			[
				"id" => 2,
				"title" => "Second Post's Title",
				"body" => "Second Post's Content"
			]
		];
	}

	public function index()
	{
		return [
			'posts' => $this->posts,
			'status' => 200
		];
	}

	public function show($id)
	{
		$posts = $this->posts;
		$post = null;

		foreach ($posts as $key => $value)
		{
			if($value['id'] == $id)
			{
				$post = $value;
			}
		}

		return [
			'post' => $post,
			'status' => $post ? 200 : 422
		];
	}

}

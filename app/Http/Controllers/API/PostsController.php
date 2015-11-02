<?php namespace App\Http\Controllers\API;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Post\PostInterface as Post;

class PostsController extends Controller {

	protected $post;

	public function __construct(Post $post)
	{
		$this->post = $post;
	}

	public function index(Request $request)
	{
		$take = $request->has('take') ? $request->input('take') : null;

		$posts = $this->post->index($take);

		return $posts;
	}

	public function show($id)
	{
		$post = $this->post->show($id);

		return $post;
	}

}

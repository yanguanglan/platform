<?php namespace App\Http\Controllers\API;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Topic\TopicInterface as Topic;

class TopicsController extends Controller {

	protected $topic;

	public function __construct(Topic $topic)
	{
		$this->topic = $topic;
	}

	public function index()
	{
		$topics = $this->topic->index();

		return $topics;
	}

	public function show($uuid)
	{
		$topic = $this->topic->show($uuid);

		return $topic;
	}

}

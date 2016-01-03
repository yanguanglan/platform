<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Topic\TopicInterface as Topic;

class TopicsController extends Controller
{
	protected $topic;

	public function __construct(Topic $topic)
	{
		$this->topic = $topic;
	}

	public function index(Request $request)
	{
		$versionBy = $request->has('versionBy') ? $request->input('versionBy') : null;

		return $this->topic->index($versionBy);
	}

	public function show(Request $request, $uuid)
	{
		$sortBy = $request->has('sortBy') ? $request->input('sortBy') : null;
		$versionBy = $request->has('versionBy') ? $request->input('versionBy') : null;

		return $this->topic->show($uuid, $sortBy, $versionBy);
	}

	public function getList(Request $request)
	{
		return $this->topic->getList();
	}
}

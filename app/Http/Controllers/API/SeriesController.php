<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Serie\SerieInterface as Serie;
use App\Repositories\User\UserInterface as User;

class SeriesController extends Controller
{
	protected $serie;
	protected $user;

	public function __construct(Serie $serie, User $user)
	{
		$this->serie = $serie;
		$this->user = $user;
	}

	public function index(Request $request)
	{
		$sortBy = $request->has('sortBy') ? $request->input('sortBy') : null;
		$versionBy = $request->has('versionBy') ? $request->input('versionBy') : null;

		return $this->serie->index($sortBy, $versionBy);
	}

	public function latest()
	{
		return $this->serie->latest();
	}

	public function show(Request $request, $uuid)
	{
		if ($request->has('views')) {
			$this->serie->updateViews($uuid);
		}

		return $this->serie->show($uuid);
	}

	public function like(Request $request)
	{
		$inputs =  $request->only('user_id', 'serie_id');

		$user = $this->user->byId($inputs['user_id']);

		$user->likedSeries()->attach($inputs['serie_id']);
	}

	public function dislike(Request $request)
	{
		$inputs =  $request->only('user_id', 'serie_id');

		$user = $this->user->byId($inputs['user_id']);

		$user->likedSeries()->detach($inputs['serie_id']);
	}

	public function book(Request $request)
	{
		$inputs =  $request->only('user_id', 'serie_id');

		$user = $this->user->byId($inputs['user_id']);

		$user->bookmarkedSeries()->attach($inputs['serie_id']);
	}

	public function unbook(Request $request)
	{
		$inputs =  $request->only('user_id', 'serie_id');

		$user = $this->user->byId($inputs['user_id']);

		$user->bookmarkedSeries()->detach($inputs['serie_id']);
	}
}

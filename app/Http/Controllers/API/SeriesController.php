<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\User\UserInterface as User;
use App\Repositories\Serie\SerieInterface as Serie;
use JWTAuth;

class SeriesController extends Controller
{
	protected $user;
	protected $serie;

	public function __construct(User $user, Serie $serie)
	{
		$this->user = $user;
		$this->serie = $serie;
		$this->middleware('jwt.auth', ['only' => ['like', 'dislike', 'book', 'unbook']]);
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

		if ($user = $this->user->getAuth()) {
			$serie = $this->serie->byAttribute('uuid', $uuid);

			$user->watchedSeries()->attach($serie->id);
		}

		return $this->serie->show($uuid);
	}

	public function like(Request $request)
	{
		$inputs =  $request->only('serie_id');

		$user = $this->user->getAuth();

		$user->likedSeries()->attach($inputs['serie_id']);
	}

	public function dislike(Request $request)
	{
		$inputs =  $request->only('serie_id');

		$user = $this->user->getAuth();

		$user->likedSeries()->detach($inputs['serie_id']);
	}

	public function book(Request $request)
	{
		$inputs =  $request->only('serie_id');

		$user = $this->user->getAuth();

		$user->bookmarkedSeries()->attach($inputs['serie_id']);
	}

	public function unbook(Request $request)
	{
		$inputs =  $request->only('serie_id');

		$user = $this->user->getAuth();

		$user->bookmarkedSeries()->detach($inputs['serie_id']);
	}
}

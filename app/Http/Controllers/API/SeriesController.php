<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Serie\SerieInterface as Serie;
use JWTAuth;

class SeriesController extends Controller
{
	protected $serie;

	public function __construct(Serie $serie)
	{
		$this->serie = $serie;
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
		$inputs =  $request->only('serie_id');

		$user = self::getUser();

		$user->likedSeries()->attach($inputs['serie_id']);
	}

	public function dislike(Request $request)
	{
		$inputs =  $request->only('serie_id');

		$user = self::getUser();

		$user->likedSeries()->detach($inputs['serie_id']);
	}

	public function book(Request $request)
	{
		$inputs =  $request->only('serie_id');

		$user = self::getUser();

		$user->bookmarkedSeries()->attach($inputs['serie_id']);
	}

	public function unbook(Request $request)
	{
		$inputs =  $request->only('serie_id');

		$user = self::getUser();

		$user->bookmarkedSeries()->detach($inputs['serie_id']);
	}

    private function getUser()
	{
		return JWTAuth::parseToken()->authenticate();
	}
}

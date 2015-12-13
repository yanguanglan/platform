<?php namespace App\Repositories\Serie;


interface SerieInterface {

	public function index($sortBy, $versionBy);

	public function latest();

	public function show($uuid);

	public function updateViews($uuid);

}

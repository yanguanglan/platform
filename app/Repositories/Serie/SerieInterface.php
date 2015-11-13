<?php namespace App\Repositories\Serie;


interface SerieInterface {

	public function index();

    public function latest();

	public function show($uuid);

    public function updateViews($uuid);

}

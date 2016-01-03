<?php namespace App\Repositories\Topic;


interface TopicInterface {

	public function index($versionBy);

	public function show($uuid, $sortBy, $versionBy);

	public function getList();

}

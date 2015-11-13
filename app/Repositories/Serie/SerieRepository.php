<?php

namespace App\Repositories\Serie;

use App\Serie;
use App\Repositories\AbstractRepository;

class SerieRepository extends AbstractRepository implements SerieInterface
{
    protected $model;

    public function __construct(Serie $model)
    {
        $this->model = $model;
    }

    public function index()
    {
        $models = $this->model
        ->with('recipes')
        ->get();

        return $models;
    }

    public function show($uuid)
    {
        $model = $this->model
        ->where('uuid', $uuid)
        ->with('recipes')
        ->firstOrFail();

        return $model;
    }

    public function updateViews($uuid)
    {
        return \DB::table('series')
        ->where('uuid', $uuid)
        ->increment('views');
    }
}

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
        ->with('lessons')
        ->get();

        return $models;
    }

    public function latest()
    {
        $models = $this->model
        ->with('lessons')
        ->orderBy('updated_at', 'desc')
        ->take(3)
        ->get();

        return $models;
    }

    public function show($uuid)
    {
        $model = $this->model
        ->where('uuid', $uuid)
        ->with(['lessons' => function($q){
            $q->orderBy('order');
        }])
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

<?php

namespace App\Repositories\Lesson;

use App\Lesson;
use App\Repositories\AbstractRepository;

class LessonRepository extends AbstractRepository implements LessonInterface
{
    protected $model;

    public function __construct(Lesson $model)
    {
        $this->model = $model;
    }

    public function show($uuid)
    {
        $model = $this->model
        ->where('uuid', $uuid)
        ->with('serie')
        ->firstOrFail();

        return $model;
    }
}

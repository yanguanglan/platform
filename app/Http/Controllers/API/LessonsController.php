<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Lesson\LessonInterface as Lesson;

class LessonsController extends Controller
{
    protected $lesson;

    public function __construct(Lesson $lesson)
    {
        $this->lesson = $lesson;
    }

    public function show(Request $request, $uuid)
    {
        return $this->lesson->show($uuid);
    }
}

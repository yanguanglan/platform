<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Serie\SerieInterface as Serie;

class SeriesController extends Controller
{
    protected $serie;

    public function __construct(Serie $serie)
    {
        $this->serie = $serie;
    }

    public function index(Request $request)
    {
        return $this->serie->index();
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
}

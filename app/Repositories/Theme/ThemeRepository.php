<?php

namespace App\Repositories\Theme;

use App\Theme;
use App\Repositories\AbstractRepository;
use Carbon\Carbon;

class ThemeRepository extends AbstractRepository implements ThemeInterface
{
	protected $model;

	public function __construct(Theme $model)
	{
		$this->model = $model;
	}

	public function index()
	{
		$models = $this->model
			->with('votes')
			->whereRaw('Year(date) = ?', [Carbon::now()->year])
			->whereRaw('Month(date) = ?', [Carbon::now()->month])
			->get();

		return $models;
	}
}

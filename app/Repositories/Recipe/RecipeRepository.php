<?php namespace App\Repositories\Recipe;

use App\Recipe;
use App\Repositories\AbstractRepository;

class RecipeRepository extends AbstractRepository implements RecipeInterface {

	protected $model;

	public function __construct(Recipe $model)
	{
		$this->model = $model;
	}

	public function index($sortBy)
	{
		$models = $this->model
		->with(['level', 'topics' => function($q){
			$q->orderBy('title');
		}])
		->get();

		if ($sortBy == 'date')
		{
			return $models->sortByDesc('updated_at')->values();
		}
		else if ($sortBy == 'views')
		{
			return $models->sortByDesc('views')->values();
		}
		else if ($sortBy == 'likes')
		{
			return $models->sortByDesc('likes')->values();
		}
		else
		{
			return $models->sortByDesc('updated_at')->values();
		}
	}

	public function show($uuid)
	{
		$model = $this->model
		->where('uuid', $uuid)
		->with(['exercises', 'level', 'resources' => function($q)
		{
			$q->orderBy('title');
		}])
		->firstOrFail();

		return $model;
	}

    public function updateViews($uuid)
    {
        return \DB::table('recipes')
        ->where('uuid', $uuid)
        ->increment('views');
    }
}

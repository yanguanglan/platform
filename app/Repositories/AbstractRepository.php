<?php namespace App\Repositories;

abstract class AbstractRepository {

	protected $model;

	public function byId($id)
	{
		return $this->model->findOrFail($id);
	}

	public function byAttribute($key, $value)
	{
		return $this->model->where($key, $value)->firstOrFail();
	}

	public function all($orderAttribute = 'id', $orderType = 'asc')
	{
		return $this->model->orderBy($orderAttribute, $orderType)->get();
	}

	public function create(array $data)
	{
		return $this->model->create($data);
	}

	public function update($id, array $data)
	{
		$model = $this->model->findOrFail($id);

		return $model->update($data);
	}

	public function updateByAttribute($key, $value, array $data)
	{
		$model = $this->model->where($key, $value)->firstOrFail;

		return $model->update($data);
	}

	public function destroy($id)
	{
		return $this->model->destroy($id);
	}

	public function createSlugs()
	{
		$models = $this->model->all();

		foreach ($models as $model) {
			$model->update(['slug' => str_slug($model->title)]);
		}
	}

	public function createContent()
	{
		$models = $this->model->all();

		foreach ($models as $model) {
			$model->update(['content_converted' => \Markdown::convertToHtml($model->content)]);
		}
	}
}

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

	public function create($data)
	{
		return $this->model->create($data);
	}

	public function update($id, $data)
	{
		$model = $this->model->findOrFail($id);

		return $model->update($data);
	}

	public function destroy($id)
	{
		return $this->model->destroy($id);
	}
}
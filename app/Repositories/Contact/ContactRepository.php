<?php namespace App\Repositories\Contact;

use App\Contact;
use App\Repositories\AbstractRepository;

class ContactRepository extends AbstractRepository implements ContactInterface {

	protected $model;

	public function __construct(Contact $model)
	{
		$this->model = $model;
	}
}
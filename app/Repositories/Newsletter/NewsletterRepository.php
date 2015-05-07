<?php namespace App\Repositories\Newsletter;

use App\Newsletter;
use App\Repositories\AbstractRepository;

class NewsletterRepository extends AbstractRepository implements NewsletterInterface {

	protected $model;

	public function __construct(Newsletter $model)
	{
		$this->model = $model;
	}
}
<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Repositories\Newsletter\NewsletterInterface as Newsletter;
use App\Http\Requests\Newsletter\StoreRequest;

class NewsletterController extends Controller {

	protected $newsletter;

	public function __construct(Newsletter $newsletter)
	{
		$this->newsletter = $newsletter;
	}

	public function store(StoreRequest $request)
	{
		$input = $request->only('name', 'email');

		$this->newsletter->create($input);

		return [
			'error' => false
		];
	}

}

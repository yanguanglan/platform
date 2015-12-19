<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Repositories\Contact\ContactInterface as Contact;
use App\Http\Requests\Contact\StoreRequest;

class ContactController extends Controller {

	protected $contact;

	public function __construct(Contact $contact)
	{
		$this->contact = $contact;
	}

	public function store(StoreRequest $request)
	{
		$input = $request->only('name', 'email', 'message');

		$this->contact->create($input);

		\Slack::to('#emails')
		->attach([
			'text' => $input['message'],
			'pretext' => $input['name'] . ' | ' . $input['email']
		])
		->send('Incoming contact message');

		return [
			'error' => false
		];
	}

}

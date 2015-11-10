<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Repositories\Contact\ContactInterface as Contact;
use App\Http\Requests\Contact\StoreRequest;
use GorkaLaucirica\HipchatAPIv2Client\Auth\OAuth2;
use GorkaLaucirica\HipchatAPIv2Client\Client;
use GorkaLaucirica\HipchatAPIv2Client\API\RoomAPI;
use GorkaLaucirica\HipchatAPIv2Client\Model\Message;

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

        $auth = new OAuth2('Nw23CHNuHDdmkAp1fiAod85TvB4XCJ9hc1rcLBNM');
        $client = new Client($auth);
        $roomAPI = new RoomAPI($client);
        $message = new Message([
            'id' => str_random(),
            'from' => $input['name'],
            'color' => 'red',
            'notify' => true,
            'message' => 'Name: '.$input['name'].' | Email: '.$input['email'].' | Message: '.$input['message'],
            'date' => \Carbon\Carbon::now()
        ]);
        $roomAPI->sendRoomNotification('Kasmades', $message);

		return [
			'error' => false
		];
	}

}

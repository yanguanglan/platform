<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\StoreRequest;

class EmailsController extends Controller {

	public function preview($category, $template)
	{
		$user = \App\User::first();
		$link = 1;

		return view('emails.'.$category.'.'.$template, compact('user', 'link'));
	}

}

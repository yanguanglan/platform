<?php

return [

	/*
	|--------------------------------------------------------------------------
	| Third Party Services
	|--------------------------------------------------------------------------
	|
	| This file is for storing the credentials for third party services such
	| as Stripe, Mailgun, Mandrill, and others. This file provides a sane
	| default location for this type of information, allowing packages
	| to have a conventional place to find your various credentials.
	|
	*/

	'mailgun' => [
		'domain' => '',
		'secret' => '',
	],

	'mandrill' => [
		'secret' => 'qRmxeKUnBAG6My3VClxqzg',
	],

	'ses' => [
		'key' => '',
		'secret' => '',
		'region' => 'us-east-1',
	],

	'stripe' => [
		'model'  => 'App\User',
		'secret' => '',
	],

	'github' => [
		'client_id' => 'f8f2e77b448821cc1ac5',
		'client_secret' => '0d7817024af8b2a31e58ebcd088e175d0fb68dea',
		'redirect' => 'http://46.101.73.29/api/auth/github/handle'
	],

];

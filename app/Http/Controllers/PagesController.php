<?php namespace App\Http\Controllers;

class PagesController extends Controller {

	public function home()
	{
		return view('partials.pages.home');
	}

	public function error()
	{
		return view('partials.pages.error');
	}
}

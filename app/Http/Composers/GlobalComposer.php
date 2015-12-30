<?php

namespace App\Http\Composers;

use Illuminate\Contracts\View\View;

class GlobalComposer
{
	/**
	 * Bind data to the view.
	 *
	 * @param View $view
	 */
	public function compose(View $view)
	{
		$data = [
			'GITHUB_CLIENT_ID' => env('GITHUB_CLIENT_ID'),
			'GITHUB_CLIENT_SECRET' => env('GITHUB_CLIENT_SECRET')
		];

		$view->with(compact('data'));
	}
}

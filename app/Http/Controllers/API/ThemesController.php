<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\User\UserInterface as User;
use App\Repositories\Theme\ThemeInterface as Theme;
use JWTAuth;

class ThemesController extends Controller
{
	protected $user;
	protected $theme;

	public function __construct(User $user, Theme $theme)
	{
		$this->user = $user;
		$this->theme = $theme;
		$this->middleware('jwt.auth', ['only' => ['vote']]);
	}

	public function index()
	{
		return $this->theme->index();
	}

	public function vote(Request $request)
	{
		$inputs = $request->only('theme_id');

		$user = $this->user->getAuth();

		$user->voted()->sync([$inputs['theme_id']]);

		return $this->theme->index();
	}
}

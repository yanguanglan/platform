<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\User\UserInterface as User;

class UsersController extends Controller
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
        $this->middleware('jwt.auth');
    }

    public function dashboard(Request $request)
    {
        return ['user' => \Auth::user()];
    }

    public function account(Request $request)
    {
        return ['user' => \Auth::user()];
    }
}

<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\User\UserInterface as User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UsersController extends Controller
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
        // $this->middleware('jwt.auth');
    }

    public function dashboard()
    {
        return ['user' => $this->user->dashboard(JWTAuth::parseToken()->authenticate()->id)];
    }

    public function account()
    {
        return ['user' => null];
    }
}

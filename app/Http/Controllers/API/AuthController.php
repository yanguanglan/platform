<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests\User\RegisterRequest;
use App\Http\Requests\User\AvailabilityRequest;
use App\Http\Controllers\Controller;
use App\Repositories\User\UserInterface as User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function login(Request $request)
    {
        if ($request->input('social')) {
            $credentials = $request->only('email');

            $user = $this->user->exists($credentials['email']);

            if ($user) {
                try {
                    // verify the credentials and create a token for the user
                    if (!$token = JWTAuth::fromUser($user)) {
                        return response()->json(['error' => true, 'msg' => 'Please enter valid credentials'], 401);
                    }
                } catch (JWTException $e) {
                    // something went wrong
                    return response()->json(['error' => true, 'msg' => 'Please enter valid credentials'], 500);
                }
            } else {
                return response()->json(['error' => true, 'msg' => 'Please enter valid credentials'], 401);
            }
        } else {
            $credentials = $request->only('email', 'password');

            try {
                // verify the credentials and create a token for the user
                if (!$token = JWTAuth::attempt($credentials)) {
                    return response()->json(['error' => true, 'msg' => 'Please enter valid credentials'], 401);
                }
            } catch (JWTException $e) {
                // something went wrong
                return response()->json(['error' => true, 'msg' => 'Please enter valid credentials'], 500);
            }

            $user = \Auth::user();
        }

        event('user.login', $user);

        // if no errors are encountered we can return a JWT
        return [
            'token' => $token,
            'user' => $user,
        ];
    }

    public function register(RegisterRequest $request)
    {
        if ($request->input('social')) {
            $credentials = $request->only('name', 'email');

            $user = $this->user->exists($credentials['email']);

            if ($user) {
                return response()->json(['error' => true, 'msg' => 'This user already exists'], 401);
            } else {
                $user = $this->user->create(array_add($credentials, 'uuid', str_random(6)));

                try {
                    // verify the credentials and create a token for the user
                    if (!$token = JWTAuth::fromUser($user)) {
                        return response()->json(['error' => true, 'msg' => 'Please enter valid credentials'], 401);
                    }
                } catch (JWTException $e) {
                    // something went wrong
                    return response()->json(['error' => true, 'msg' => 'Please enter valid credentials'], 500);
                }
            }
        } else {
            $credentials = $request->only('name', 'email', 'password');

            $user = $this->user->create(array_add($credentials, 'uuid', str_random(6)));

            try {
                // verify the credentials and create a token for the user
            if (!$token = JWTAuth::fromUser($user)) {
                return response()->json(['error' => 'Please enter valid credentials'], 401);
            }
            } catch (JWTException $e) {
                // something went wrong
            return response()->json(['error' => 'Please enter valid credentials'], 500);
            }
        }

        event('user.register', $user);

        return [
            'token' => $token,
            'user' => $user,
        ];
    }

    public function availability(AvailabilityRequest $request)
    {
        return ['error' => $this->user->exists($request->only('email')) ? true : false];
    }
}

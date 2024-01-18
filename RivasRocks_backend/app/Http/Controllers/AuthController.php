<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Validator;
use App\Models\User;

class AuthController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        } 

        return $this->respondWithToken($token);
    }

    public function register(RegisterRequest $request)
    {
        $user = new User;
        $user->name = $request->name;
        $user->surname_1 = $request->surname_1;
        $user->surname_2 = $request->surname_2;
        $user->birth_date = $request->birth_date;
        $user->email= $request->email;
        $user->password = bcrypt($request->password);
        $user->Admin = $request->admin;
        $user->save();

        response()->json([
            'message' => 'Successfully created user!', 'user' => $user
        ], 200);
    }


    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser()
    {
        return response()->json(auth()->user());
    }

    public function updateUser(Request $request) {
        $user = User::find($request->id);
        $user->name = $request->name;
        $user->surname_1 = $request->surname_1;
        $user->surname_2 = $request->surname_2;
        $user->birth_date = $request->birth_date;
        $user->email= $request->email;
        //$user->password = bcrypt($request->password);
        $user->save();

        response()->json([
            'message' => 'Successfully updated user!', 'user' => $user
        ], 200);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),
        ]);
    }
}

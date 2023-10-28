<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Handle an authentication attempt.
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'min:3'],
        ]);

        if (Auth::attempt($credentials)) {
            $token = $request->user()->createToken($credentials['email']);

            return response()->json(['token' => $token->plainTextToken]);
            // return response("Success")->cookie(\Cookie('token', $token->plainTextToken, 60, '/', null, false, true));
        } else {
            return response()->json(["message" => "Unauthorized"], 401);
        }



    }
}
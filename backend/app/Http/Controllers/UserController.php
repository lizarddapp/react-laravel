<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class UserController extends Controller
{

    public function index(Request $request)
    {

        $email = $request->query('email');
        $name = $request->query('name');
        $phone = $request->query('phone');

        $query = User::query();

        if ($email) {
            $query->where('email', 'like', "%$email%");
        }
        if ($phone) {
            $query->where('phone', $phone);
        }

        if ($name) {
            $query->where('first_name', $name)->orWhere('last_name', $name);
        }
        $data = $query->get();
        return response()->json($data);
    }

    public function show($id)
    {
        $data = User::findOrFail($id);
        return response()->json($data);
    }

    public function destroy($id)
    {
        $data = User::where('id', $id)->delete();
        return response()->json($data);
    }
    public function store(Request $request)
    {

        // Validate user input

        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users',
            'phone' => 'required',
            'password' => 'required|min:3',
            'status' => 'string|in:active,inactive'
        ]);

        $hashedPassword = Hash::make($request->input('password'));

        // Create and store the user
        $user = new User([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'password' => $hashedPassword,
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'status' => 'inactive',

        ]);
        $user->save();
        // Store the user...

        return response()->json($user);

    }


    public function update($id, Request $request)
    {
        $user = User::findOrFail($id);
        // Validate user input

        $validated = $request->validate([
            'email' => 'email|unique:users,email,' . $user->id,
            'first_name' => 'string',
            'last_name' => 'string',
            'phone' => 'string',
            'status' => 'in:active,inactive',
        ]);



        $user->update($validated);
        return response()->json($user);

    }
}

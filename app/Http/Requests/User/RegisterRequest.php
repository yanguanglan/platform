<?php

namespace App\Http\Requests\User;

use App\Http\Requests\Request;

class RegisterRequest extends Request
{
	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			'name' => 'required',
			'email' => $this->social ? 'required|email' : 'required|email|unique:users',
			'password' => 'required_without:social',
		];
	}

	public function response(array $errors)
	{
		return response()->json([
			'error' => true,
			'msg' => 'Please enter valid credentials and retry!'
		]);
	}
}

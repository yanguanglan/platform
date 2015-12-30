<?php namespace App\Http\Requests\User;

use App\Http\Requests\Request;

class UpdateRequest extends Request {

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
			'name'  => 'required',
			'email' => 'required|email|unique:users,email,' . $this->users
		];
	}

	public function response(array $errors)
	{
		return response()->json([
			'error' => true,
			'msg'   => 'Please enter valid credentials and retry!'
		]);
	}

}

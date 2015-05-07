<?php namespace App\Http\Requests\Contact;

use App\Http\Requests\Request;

class StoreRequest extends Request {

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
			'name'    => 'required',
			'email'   => 'required|email',
			'message' => 'required'
		];
	}

	public function response(array $errors)
	{
		return response()->json([
			'error' => true,
			'msg'   => 'Please enter valid credentials'
		]);
	}

}

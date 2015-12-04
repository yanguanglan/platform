<?php namespace App\Http\Requests\User;

use App\Http\Requests\Request;

class AvailabilityRequest extends Request {

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
			'email' => 'required|email'
		];
	}

	public function response(array $errors)
	{
		return response()->json([
			'error' => false
		]);
	}

}

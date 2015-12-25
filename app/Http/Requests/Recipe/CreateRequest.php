<?php namespace App\Http\Requests\Recipe;

use App\Http\Requests\Request;

class CreateRequest extends Request {

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
			'title'  => 'required',
			'content'  => 'required',
			'release'  => 'required',
			'version'  => 'required',
			'user_id' => 'required|exists:users,id'
		];
	}

	public function response(array $errors)
	{
		return response()->json([
			'error' => true,
			'msg'   => 'Please enter valid data!'
		]);
	}

}

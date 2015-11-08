<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Level extends Model {

	protected $guarded = ['id'];

	public $timestamps = false;

	public function recipes()
	{
		return $this->hasMany('App\Recipe');
	}

}

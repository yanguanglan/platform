<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model {

	protected $guarded = ['id'];

	public $timestamps = false;

	public function recipes()
	{
		return $this->belongsToMany('App\Recipe');
	}

}

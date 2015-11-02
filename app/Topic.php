<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model {

	public $timestamps = false;

	protected $guarded = ['id'];

	public function recipes()
	{
		return $this->belongsToMany('App\Recipe');
	}

}

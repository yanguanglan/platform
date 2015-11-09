<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model {

	protected $guarded = ['id'];

	public $timestamps = false;

	public function recipe()
	{
		return $this->belongsTo('App\Recipe');
	}

}

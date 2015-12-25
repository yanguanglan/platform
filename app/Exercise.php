<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model {

	protected $guarded = ['id'];

	public $timestamps = false;

	public $appends = ['codepen_url'];

	public function recipe()
	{
		return $this->belongsTo('App\Recipe');
	}

	public function getCodepenUrlAttribute()
	{
		return $this->attributes['codepen'] ? 'http://codepen.io/angularjs-recipes/pen/' . $this->attributes['codepen'] : null;
	}

}

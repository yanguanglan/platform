<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model {

	protected $guarded = ['id'];

	public $timestamps = false;

	public $appends = ['codepen_url', 'plunker_url'];

	public function getPlunkerUrlAttribute()
	{
		return $this->attributes['plunker'] ? 'http://embed.plnkr.co/' . $this->attributes['plunker'] : null;
	}

	public function getCodepenUrlAttribute()
	{
		return $this->attributes['codepen'] ? 'http://codepen.io/angularjs-recipes/pen/' . $this->attributes['codepen'] : null;
	}

	public function recipe()
	{
		return $this->belongsTo('App\Recipe');
	}

}

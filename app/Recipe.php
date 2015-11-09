<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model {

	protected $guarded = ['id', 'created_at', 'updated_at'];

	public $appends = ['codepen_url', 'human_read_created_at', 'human_read_updated_at'];

	public function getCodepenUrlAttribute()
	{
		return $this->attributes['codepen'] ? 'http://codepen.io/angularjs-recipes/pen/' . $this->attributes['codepen'] : null;
	}

	public function getHumanReadCreatedAtAttribute()
	{
		return $this->created_at->diffForHumans();
	}

	public function getHumanReadUpdatedAtAttribute()
	{
		return $this->updated_at->diffForHumans();
	}

	public function level()
	{
		return $this->belongsTo('App\Level');
	}

	public function topics()
	{
		return $this->belongsToMany('App\Topic');
	}

	public function resources()
	{
		return $this->belongsToMany('App\Resource');
	}

	public function exercises()
	{
		return $this->hasMany('App\Exercise');
	}

}

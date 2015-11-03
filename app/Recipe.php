<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model {

	protected $guarded = ['id', 'created_at', 'updated_at'];

	public $appends = ['human_read_created_at', 'human_read_updated_at'];

	public function getCodepenAttribute($value)
	{
		return $value ? 'http://codepen.io/angularjs-recipes/pen/' . $value : null;
	}

	public function getHumanReadCreatedAtAttribute()
	{
		return $this->created_at->diffForHumans();
	}

	public function getHumanReadUpdatedAtAttribute()
	{
		return $this->updated_at->diffForHumans();
	}

	public function topics()
	{
		return $this->belongsToMany('App\Topic');
	}

}

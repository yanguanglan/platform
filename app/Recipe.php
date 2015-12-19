<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model {

	protected $guarded = ['id', 'created_at', 'updated_at'];

	public $appends = ['img', 'codepen_url', 'human_read_created_at', 'human_read_updated_at'];

	public function getCodepenUrlAttribute()
	{
		return $this->attributes['codepen'] ? 'http://codepen.io/angularjs-recipes/pen/' . $this->attributes['codepen'] : null;
	}

	public function getImgAttribute()
	{
		return $this->attributes['release'] == 1 ? 'angularjs-1.png' : 'angularjs-2.png';
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

	public function likes()
	{
		return $this->belongsToMany('App\User', 'recipes_likes', 'recipe_id', 'user_id');
	}

	public function bookings()
	{
		return $this->belongsToMany('App\User', 'recipes_bookmarks', 'recipe_id', 'user_id');
	}

	public function watches()
	{
		return $this->belongsToMany('App\User', 'recipes_watches', 'recipe_id', 'user_id');
	}

}

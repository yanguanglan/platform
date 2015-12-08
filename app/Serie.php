<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Serie extends Model {

	protected $guarded = ['id', 'created_at', 'updated_at'];

	public $appends = ['human_read_created_at', 'human_read_updated_at'];

	public function getHumanReadCreatedAtAttribute()
	{
		return $this->created_at->diffForHumans();
	}

	public function getImageAttribute()
	{
		return asset('img/series/' . $this->attributes['image']);
	}

	public function getHumanReadUpdatedAtAttribute()
	{
		return $this->updated_at->diffForHumans();
	}

	public function lessons()
	{
		return $this->hasMany('App\Lesson');
	}

	public function likes()
	{
		return $this->belongsToMany('App\User', 'series_likes', 'serie_id', 'user_id');
	}

	public function bookings()
	{
		return $this->belongsToMany('App\User', 'series_bookmarks', 'serie_id', 'user_id');
	}

	public function watches()
	{
		return $this->belongsToMany('App\User', 'series_watches', 'serie_id', 'user_id');
	}

}

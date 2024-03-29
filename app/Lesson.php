<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model {

	protected $guarded = ['id', 'created_at', 'updated_at'];

	public $appends = ['human_read_created_at', 'human_read_updated_at'];

	public function getHumanReadCreatedAtAttribute()
	{
		return $this->created_at->diffForHumans();
	}

	public function getHumanReadUpdatedAtAttribute()
	{
		return $this->updated_at->diffForHumans();
	}

	public function serie()
	{
		return $this->belongsTo('App\Serie');
	}

}

<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Theme extends Model {

	public $timestamps = false;

	protected $guarded = ['id'];

	public function votes()
	{
		return $this->belongsToMany('App\User', 'votes', 'theme_id', 'user_id');
	}

}

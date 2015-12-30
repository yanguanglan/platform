<?php namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract
{
	use Authenticatable, Authorizable, CanResetPassword;


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['uuid', 'name', 'email', 'password', 'token', 'expires_at', 'last_login'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['password', 'remember_token'];

	protected $dates = ['created_at', 'updated_at', 'expires_at', 'last_login'];

	public $appends = ['hasPassword'];

	public function getHasPasswordAttribute()
	{
		return $this->password ? true : false;
	}

	public function setPasswordAttribute($value)
	{
		$this->attributes['password'] = $value ? bcrypt($value) : null;
	}

	public function likedRecipes()
	{
		return $this->belongsToMany('App\Recipe', 'recipes_likes', 'user_id', 'recipe_id');
	}

	public function bookmarkedRecipes()
	{
		return $this->belongsToMany('App\Recipe', 'recipes_bookmarks', 'user_id', 'recipe_id');
	}

	public function watchedRecipes()
	{
		return $this->belongsToMany('App\Recipe', 'recipes_watches', 'user_id', 'recipe_id');
	}

	public function likedSeries()
	{
		return $this->belongsToMany('App\Serie', 'series_likes', 'user_id', 'serie_id');
	}

	public function bookmarkedSeries()
	{
		return $this->belongsToMany('App\Serie', 'series_bookmarks', 'user_id', 'serie_id');
	}

	public function watchedSeries()
	{
		return $this->belongsToMany('App\Serie', 'series_watches', 'user_id', 'serie_id');
	}

	public function voted()
	{
		return $this->belongsToMany('App\Theme', 'votes', 'user_id', 'theme_id');
	}

	public function authored()
	{
		return $this->hasMany('App\Recipe');
	}

}

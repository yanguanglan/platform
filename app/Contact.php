<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model {

	protected $table = 'contact';

	protected $guarded = ['id', 'created_at', 'updated_at'];

}

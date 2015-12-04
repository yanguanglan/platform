<?php namespace App\Repositories\User;


interface UserInterface {

    public function exists($email);

}

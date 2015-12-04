<?php namespace App\Repositories\User;


interface UserInterface {

    public function exists($email);

    public function account($id);

    public function dashboard($id);

}

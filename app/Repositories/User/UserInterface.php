<?php namespace App\Repositories\User;


interface UserInterface {

    public function exists($email);

    public function session($id);
    
    public function account($id);

    public function dashboard($id);

}

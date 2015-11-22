<?php

class HomeTest extends TestCase {

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testHome()
    {
        $this->call('GET', '/');

        $this->assertResponseOk();
    }

}

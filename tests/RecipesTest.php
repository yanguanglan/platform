<?php

class RecipesTest extends TestCase {

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $this->call('GET', '/api/recipes');

        $this->assertResponseOk();
    }

    public function testLatest()
    {
        $this->call('GET', '/api/recipes-latest');

        $this->assertResponseOk();
    }

}

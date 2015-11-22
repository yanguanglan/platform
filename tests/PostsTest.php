<?php

class PostsTest extends TestCase {

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $this->call('GET', '/api/posts');

        $this->assertResponseOk();
    }

}

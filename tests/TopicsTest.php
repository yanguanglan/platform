<?php

class TopicsTest extends TestCase {

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $this->call('GET', '/api/topics');

        $this->assertResponseOk();
    }

}

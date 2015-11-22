<?php

class SeriesTest extends TestCase {

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $this->call('GET', '/api/series');

        $this->assertResponseOk();
    }

    public function testLatest()
    {
        $this->call('GET', '/api/series-latest');

        $this->assertResponseOk();
    }

}

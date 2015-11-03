<?php
use \FunctionalTester;

class PostsCest
{
    public function _before(FunctionalTester $I)
    {
    }

    public function _after(FunctionalTester $I)
    {
    }

    public function tryToTestPostsIndex(FunctionalTester $I)
    {
        $I->wantTo('test posts API');
        $I->sendGET('posts');
        $I->seeResponseCodeIs('200');
    }

    public function tryToTestPostsShowError(FunctionalTester $I)
    {
        $I->wantTo('test posts/:id API');
        $I->sendGET('posts/1');
        $I->seeResponseCodeIs('500');
    }
}

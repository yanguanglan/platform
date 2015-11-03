<?php
use \FunctionalTester;

class TopicsCest
{
    public function _before(FunctionalTester $I)
    {
    }

    public function _after(FunctionalTester $I)
    {
    }

    public function tryToTestTopicsIndex(FunctionalTester $I)
    {
        $I->wantTo('test topics API');
        $I->sendGET('topics');
        $I->seeResponseCodeIs('200');
    }

    public function tryToTestTopicsShowError(FunctionalTester $I)
    {
        $I->wantTo('test topics/:id API');
        $I->sendGET('topics/1');
        $I->seeResponseCodeIs('500');
    }
}

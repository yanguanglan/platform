<?php
use \FunctionalTester;

class RecipesCest
{
    public function _before(FunctionalTester $I)
    {
    }

    public function _after(FunctionalTester $I)
    {
    }

    public function tryToTestRecipesIndex(FunctionalTester $I)
    {
        $I->wantTo('test recipes API');
        $I->sendGET('recipes');
        $I->seeResponseCodeIs('200');
    }

    public function tryToTestRecipesShowError(FunctionalTester $I)
    {
        $I->wantTo('test recipes/:id API');
        $I->sendGET('recipes/1');
        $I->seeResponseCodeIs('500');
    }
}

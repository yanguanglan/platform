Feature: Recipes API
    In order to test /api/recipes

Scenario: index method
    When I go to "/api/recipes"
    Then I should be on "/api/recipes"
    Then the response status code should be 200

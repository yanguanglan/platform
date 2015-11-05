Feature: Topics API
    In order to test /api/topics

Scenario: index method
    When I go to "/api/topics"
    Then I should be on "/api/topics"
    Then the response status code should be 200

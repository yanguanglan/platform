Feature: Posts API
    In order to test /api/posts

Scenario: index method
    When I go to "/api/posts"
    Then I should be on "/api/posts"
    Then the response status code should be 200

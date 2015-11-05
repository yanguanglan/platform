Feature: Homepage
    In order to test /

Scenario: index method
    When I go to the homepage
    Then I should be on "/"
    Then the response status code should be 200

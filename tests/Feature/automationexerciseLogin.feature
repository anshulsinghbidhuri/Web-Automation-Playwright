@automationexercise
Feature: Login for Automation Exercise

  Background:
    Given Login page Automation Exercise

  Scenario: Login with valid credentials
    When User click on Signup button
    Then user fill Username and email address
    And User fill the details and create account
    * User delete the account

  Scenario: Login with invalid credentials
    When User click on login button
    Then User fill incorrect email and password
    And user Click login button with incorrect credentials

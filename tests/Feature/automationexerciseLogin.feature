@automationexercise
Feature: Login for Automation Exercise
Describe: This feature tests the login and signup functionality of the Automation Exercise website, including user signup, login with valid and invalid credentials, and logout.

  Background:
    Given Login page Automation Exercise

  Scenario:User Signup with valid credentials
    When User click on Signup button
    Then user fill Username and email address with new credentials
    And User fill the details and create account
    * User delete the account

  Scenario: Login with invalid credentials
    When User click on login button
    Then User fill incorrect email and password
    And user Click login button with incorrect credentials

    Scenario: User Login with Correct email and password
    When User click on login button
    Then User fill correct email and password
    And user Click login button with correct credentials
    * User Logout from the account

    Scenario: Sigin with existing email
    When User click on Signup button
    Then user fill Username and email address with existing credentials
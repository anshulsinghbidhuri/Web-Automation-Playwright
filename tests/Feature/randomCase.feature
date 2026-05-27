@randomCase
Feature: Random Case Testing
  Describe: This feature tests the random case functionality of the application, ensuring that it can handle various input cases effectively.

 Background:
  Given Login page Automation Exercise

    Scenario: User Fills the contact form
    Given user click on contact us button
    When user fill the details in contact form
    | Name     | Subject       | Message                                              |
    | TestName | Test Subject  | This is a test message for the get in touch section. |
    Then user submit the form
    
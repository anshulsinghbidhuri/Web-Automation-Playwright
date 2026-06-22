@randomCase
Feature: Random Case Testing
  Describe: This feature tests the random case functionality of the application, ensuring that it can handle various input cases effectively.

 Background:
  Given Login page Automation Exercise

    Scenario:01 User Fills the contact form
    Given user click on contact us button
    When user fill the details in contact form
    | Name     | Subject       | Message                                              |
    | TestName | Test Subject  | This is a test message for the get in touch section. |
    Then user submit the form
    
    Scenario:02 verify Web site Test case page
    Given user click on Test Cases button
    When user should navigate to test cases page successfully
    Then user click on the test cases for Details of the test cases

    Scenario:03 Verify Subscription in home page
    Given User scroll down to footer and add email in subscription field
    When User click on submit button
    Then User should see success message for subscription

    Scenario:04 Verify Subscription in Cart page
    Given User navigate to Cart page and fill email in subscription field
    When User click on submit button
    Then User should see success message for subscription

    Scenario:05 Verify Scroll Up using 'Arrow' button and Scroll Down functionality 
    Given User scroll down to footer and clicking on Arrow button
    When Assert User should navigate to top of the page
    Then User scroll down to footer and clicking on Arrow button again
    When Assert User should navigate to top of the page

    Scenario:06 Verify Scroll Up without 'Arrow' button and Scroll Down functionality 
    Given User scroll down to footer and without clicking on Arrow button  
    When Assert User should navigate to top of the page
    Then User scroll down to footer and without clicking on Arrow button again
    When Assert User should navigate to top of the page

    Scenario:07 verify Web site API Testing case page
    Given user click on API Testing button
    When user should navigate to API Testing page successfully
    Then user click on the API Testing for Details of the API Testing
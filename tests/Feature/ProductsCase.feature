@ProductsCase 
Feature: Products Case
Describe: This feature tests the products functionality of the application, ensuring that it can handle various product-related operations effectively.

Background:
  Given Login page Automation Exercise
  When User click on Signup button
  Then user fill Username and email address with new credentials
  And User fill the details and create account

  Scenario:01 Verify All Products and product detail page
  Given user click on Products Button and verify user should navigate to ALL PRODUCTS page successfully
  When user click on View Product of <product> and can view product detail is opened
  |product |
  |Blue Top|
  Then user should be landed to product detail page successfully

 Scenario:02 Search Product
  Given user click on Products Button and verify user should navigate to ALL PRODUCTS page successfully
  When User enter product name in search input and click search button
  Then user should be able to see products related to search

Scenario:03 Add Products in Cart
  Given user click on Products Button and verify user should navigate to ALL PRODUCTS page successfully
  When user click on Add To Cart of <product> and view product detail is opened
  |product     |
  |Blue Top    |
  Then user should be able to add products in cart successfully
  *  user click on Add To Cart of <product> and view product detail is opened
  |product    |
  |Sleeveless |
  * user should be able to add products in cart successfully
  Then user click on cart and verify user should be able to see all products in cart successfully
  * User cancel the one Product
  * User proceed to checkout and verify user should be landed to checkout page successfully
  Then User add a comment about your order and Click Place Order button
  * User pay the payment and Verify the Order is Placed successfully
  * user see the order confirmed and Download Invoice and Verify Invoice is downloaded successfully
  Then User click on Continue button and verify user should be navigated to the home page successfully
  
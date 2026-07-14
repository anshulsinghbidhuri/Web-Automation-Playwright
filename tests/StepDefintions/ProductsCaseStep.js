import { Given, When, Then, Before } from '@cucumber/cucumber';
import {ProductsCase} from '../Pages/productsCase.js';
import { genrateRandomEmail, genrateRandomUsername ,genrateMobileNumber} from '../Support/helperFuntion.js';

let productsPage;

Before(async function () {
    productsPage = new ProductsCase(this.page);
});

Given('user click on Products Button and verify user should navigate to ALL PRODUCTS page successfully', async function () {
    await productsPage.clickOnProductsButton();
    await productsPage.getAllProductsPageTitle();
    
});

When(/user click on (View Product|Add To Cart) of <product> and view product detail is opened/, async function (action, dataTable) {
    const rows = dataTable.hashes();
    const productName = rows[0].product;
    await productsPage.clickProductAction(productName, action);
    
});

Then('user should be landed to product detail page successfully', async function () {
    await productsPage.getProductDetailPageTitle();
    await productsPage.getProductPrice();
    await productsPage.getProductCategory();

});

When('User enter product name in search input and click search button', async function () {
    await productsPage.enterProductNameInSearchInput("Blue Top");

});

Then('user should be able to see products related to search', async function () {
    await productsPage.getSearchProductResult();
    await productsPage.getSearchProductName("Blue Top");

});

Then ('user should be able to add products in cart successfully', async function () {
    await productsPage.getAddToCartSuccessMessage();
    await productsPage.getyourCartPageTitle();
    await productsPage.clickOnContinueShoppingButton();
});

Then ('user click on cart and verify user should be able to see all products in cart successfully', async function () {
    await productsPage.clickOnCartButton();
    await productsPage.getShoppingcartPageTitle();
});

Then ('User cancel the one Product', async function () {
    await productsPage.clickOnCrossButton();
});

Then ('User proceed to checkout and verify user should be landed to checkout page successfully', async function () {
    await productsPage.clickOnProceedToCheckoutButton();
    await productsPage.getYourdeliveryaddress();
    await productsPage.getReviewYourOrder();
});

Then ('User add a comment about your order and Click Place Order button', async function () {
    await productsPage.enterCommentAboutOrder("Please deliver between 9 AM to 5 PM");
    await productsPage.clickOnPlaceOrderButton();
});

Then ('User pay the payment and Verify the Order is Placed successfully', async function () {
    await productsPage.enterCardDetails("Testing User", "1234567890123456", "123", "12", "2025");
    await productsPage.clickOnPayandConfirmOrderButton();
});

Then ('user see the order confirmed and Download Invoice and Verify Invoice is downloaded successfully', async function () {
  await productsPage.getOrderConfirmationMessage();
  await productsPage.clickOnDownloadInvoiceButton();
});

Then ('User click on Continue button and verify user should be navigated to the home page successfully', async function () {
    await productsPage.clickOnContinueButton();
});
import { Given, When, Then, Before } from '@cucumber/cucumber';
import {RandomCase} from '../Pages/randomCase.js';
import { genrateRandomEmail, genrateRandomUsername ,genrateMobileNumber} from '../Support/helperFuntion.js';

let randomPage;

Before(async function () {
    randomPage = new RandomCase(this.page);
});

Given('user click on contact us button', async function () {
    await randomPage.clickContactUs();
    await randomPage.getintouchAssertion();
});

When('user fill the details in contact form', async function (dataTable) {
        const data = dataTable.hashes()[0];
        const name = data.Name+'_'+genrateRandomUsername();
        const subject = data.Subject;
        const message = data.Message;
    await randomPage.fillContactForm(name, genrateRandomEmail(), subject, message);

});

Then('user submit the form', async function () {
    await randomPage.SubmitButton();
});


Given('user click on Test Cases button', async function () {
    await randomPage.clickTestCases();
});

When('user should navigate to test cases page successfully', async function () {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    await randomPage.getTestCasesPageAssertion();
});

Then('user click on the test cases for Details of the test cases', async function () {
    await randomPage.openTestCase('Test Case 1: Register User');
    await randomPage.openTestCase('Test Case 2: Login User with correct email and password');
});

Given('User scroll down to footer and add email in subscription field', async function () {
    await randomPage.pageScrollDown();
    await randomPage.getViewSubscritionHeadingAssertion();
    await randomPage.fillSubscriptionField(genrateRandomEmail());
});

When('User click on submit button', async function () {
   await randomPage.submitSubscriptionButton();
});

Then('User should see success message for subscription', async function () {
    await randomPage.getSubscriptionSuccessMessageAssertion();
});

Given('User navigate to Cart page and fill email in subscription field', async function () {
    await randomPage.clickCartButton();
    await randomPage.getViewSubscritionHeadingAssertion();
    await randomPage.fillSubscriptionField(genrateRandomEmail());
});

Given(/User scroll down to footer and (without clicking|clicking) on Arrow button/, async function (clickOption) {
    if(clickOption === 'clicking'){
        await randomPage.pageScrollDown();
        await randomPage.getViewSubscritionHeadingAssertion();
        await randomPage.clickArrowButton();
    }else{
        await randomPage.pageScrollDown();
        await randomPage.getViewSubscritionHeadingAssertion();
        await randomPage.pageScrollUp();
    }
    
});

When('Assert User should navigate to top of the page', async function () {
    await randomPage.getViewArrowButtonAssertionTopPage();
});

Given('user click on API Testing button', async function () {
   await randomPage.clickApiTestingButton();
});

When('user should navigate to API Testing page successfully', async function () {
    await randomPage.getApiTestingPageAssertion();
});

Then('user click on the API Testing for Details of the API Testing', async function () {
    await randomPage.openTestCase('API 1: Get All Products List');
    await randomPage.openTestCase('API 9: DELETE To Verify Login');
   
});
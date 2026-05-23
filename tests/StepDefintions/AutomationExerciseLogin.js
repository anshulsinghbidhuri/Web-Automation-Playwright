import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { AutomationExerciseLogin } from '../Pages/AutomationExerciseLogin.js';
import { genrateRandomEmail, genrateRandomUsername ,genrateMobileNumber} from '../Support/helperFuntion.js';
import { waitForDebugger } from 'inspector';
import userCredentials from '../Support/config.js';

let loginPage;
const randomUsername = genrateRandomUsername();
const randomEmail = genrateRandomEmail();
const randomMobile = genrateMobileNumber();

Given('Login page Automation Exercise', async function () {
    await this.page.goto('https://automationexercise.com/');
    const title = await this.page.title();
    assert.match(title, /Automation Exercise/);
    loginPage = new AutomationExerciseLogin(this.page);
});

When('User click on Signup button', async function () {
    await loginPage.clickSignupLogin();
});

Then(/user fill Username and email address with (new|existing) credentials/, async function (type) {
    if(type === 'existing'){
    await loginPage.fillSignupForm(userCredentials.username, userCredentials.email);
    await loginPage.clickSignupButton();
    await loginPage.existSignupError();
    }else{
    await loginPage.fillSignupForm(randomUsername, randomEmail);
    await loginPage.clickSignupButton();
    await loginPage.assertTitleSignup();
    }
});

Then('User fill the details and create account', async function () {
await loginPage.fillSignupDetails('Password123', '10', 'May', '1990', randomUsername, 'Abc', '123 Main St', 'New Delhi', 'Delhi', '110023', randomMobile);
await loginPage.clickCreateAccount();
await loginPage.createAccountVerify();
await loginPage.clickContinue();
});

Then('User delete the account', async function () {
    await loginPage.deleteAccount();
    await loginPage.deleteAccountVerify();
    await loginPage.clickContinue();

});

When('User click on login button', async function () {
    await loginPage.clickSignupLogin();
    await loginPage.assertTitleLogin();
});

Then(/User fill (incorrect|correct) email and password/, async function (type) {

    if(type === 'correct'){
        await loginPage.fillLoginDetails(userCredentials.email, userCredentials.password);
    }else{
        await loginPage.fillLoginDetails(randomEmail, 'Password123');
    }
});

Then(/user Click login button with (incorrect|correct) credentials/, async function (type) {
await loginPage.clickLoginButton();
if(type === 'correct'){
    await loginPage.assertLoginSuccess();
}else{
    await loginPage.assertLoginError();
}   
});

Then('User Logout from the account', async function () {
    await loginPage.clickLogoutButton();
});
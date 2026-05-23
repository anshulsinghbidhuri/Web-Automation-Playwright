import { expect } from "@playwright/test";
import userCredentials from '../Support/config.js';
export class AutomationExerciseLogin {

    constructor(page) {
        this.page = page;
    }

    // Locators
    clicksignuplogin() {
        return this.page.getByRole('link', { name: 'Signup / Login' });
    }

    fillName(){
        return this.page.getByPlaceholder('Name');
    }

    fillEmail(){
        return this.page.locator('//input[@data-qa="signup-email"]');
    }

    signupButton(){
        return this.page.getByRole('button',{ name: 'Signup' });
    }

    genderRadioButton(){
        return this.page.getByRole('radio', { name: 'Mr.' });
    }

    passwordField(){
        return this.page.getByRole('textbox', { name: 'Password' });
    }

    dateOfBirthDate(){
        return this.page.locator('//select[@data-qa="days"]');
    }

    dateOfBirthMonth(){
        return this.page.locator('//select[@data-qa="months"]');
    }

    dateOfBirthyear(){
        return this.page.locator('//select[@data-qa="years"]');
    }

    lableTicker(){
        return this.page.getByLabel('Sign up for our newsletter!');
    }

    lableOffers(){
        return this.page.getByLabel('Receive special offers from our partners!');
    }

    firstName(){
        return this.page.getByRole('textbox', { name: 'First Name' });
    }

    lastName(){
        return this.page.getByRole('textbox', { name: 'Last Name' });
    }

    Address(){
        return this.page.getByRole('textbox', { name: 'Address' }).first();
    }

    country(){
        return this.page.locator('//select[@data-qa="country"]');
    }

    state(){
        return this.page.getByRole('textbox', { name: 'State' });
    }

    city(){
        return this.page.getByRole('textbox', { name: 'City' });
    }

    zipcode(){
        return this.page.locator('//input[@data-qa="zipcode"]');
    }

    mobileNumber(){
        return this.page.getByRole('textbox', { name: 'Mobile Number' });
    }

    createAccountButton(){
        return this.page.getByRole('button', { name: 'Create Account' });
    }

    ContinueButton(){
    return this.page.getByRole('link', { name: 'Continue' });
    }

   deleteAccountButton() {
    return this.page.getByRole('link', { name: 'Delete Account' });
   }

   passwordLogin(){
    return this.page.getByPlaceholder('Password');
   }

   emailLogin(){
   return this.page.locator('//input[@data-qa="login-email"]');
   }
   
   loginButton(){
    return this.page.getByRole('button', { name: 'Login' });
   }

   logOutButton(){
    return this.page.getByRole('link', { name: 'logout' });
   }




    // Functions
    async clickSignupLogin() {
        await this.clicksignuplogin().click();
    }

    async fillSignupForm(name, email) {
        await this.fillName().fill(name);
        await this.fillEmail().fill(email);
    }

    async clickSignupButton() {
        await this.signupButton().click();
    }

    async fillSignupDetails(password, day, month, year, firstName, lastName, address, state, city, zipcode, mobile) {
        await this.genderRadioButton().check();
        await this.passwordField().fill(password);
        await this.dateOfBirthDate().selectOption({ label: day });
        await this.dateOfBirthMonth().selectOption({ label: month });
        await this.dateOfBirthyear().selectOption({ label: year });
        await this.lableTicker().check();
        await this.lableOffers().check();
        await this.firstName().fill(firstName);
        await this.lastName().fill(lastName);
        await this.Address().fill(address);
        await this.state().fill(state);
        await this.city().fill(city);
        await this.zipcode().fill(zipcode);
        await this.mobileNumber().fill(mobile);
    }

    async clickCreateAccount() {
        await this.createAccountButton().click();
    }

    async clickContinue() {
        await this.ContinueButton().click();
    }

    async deleteAccount() {
        await this.deleteAccountButton().click();
    }

     async fillLoginDetails(email, password){
        await this.emailLogin().fill(email);
        await this.passwordLogin().fill(password);
    }

     async clickLoginButton(){
        await this.loginButton().click();
     }

     async clickLogoutButton(){
        await this.logOutButton().click();
     }

      async assertLoginSuccess() {
        await expect(this.page.getByText('Logged in as ' + userCredentials.username)).toBeVisible();
    }





    // Assertions

    async assertTitleSignup(){
        return this.page.getByText('Enter Account Information').isVisible()
    }

    async assertSignupLoginVisible() {
       return this.page.getByText('New User Signup!').isVisible();
    }

    async createAccountVerify(){
        return this.page.getByText('ACCOUNT CREATED!!').isVisible();
    }

    async deleteAccountVerify(){
        return this.page.getByText('ACCOUNT DELETED!').isVisible();
    }
    
    async assertTitleLogin(){
       await expect(this.page.getByText('Login to your account')).toBeVisible();
    }

    async assertLoginError() {
      await expect( this.page.getByText('Your email or password is incorrect!')).toBeVisible();
    }

    async existSignupError(){
        await expect(this.page.getByText('Email Address already exist!')).toBeVisible();
    }

}

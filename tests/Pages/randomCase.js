import { expect } from "@playwright/test";
export class RandomCase {

    constructor(page) {
        this.page = page;
    }


    //Locators
     ContactUsButton(){
        return this.page.getByRole('link', { name: 'Contact us' });
     }

     EnterName(){
        return this.page.getByPlaceholder('Name');
     }

     EnterEmail(){
        return this.page.getByPlaceholder('Email').first();
     }

     EnterSubject(){
        return this.page.getByPlaceholder('Subject');
     }

     EnterMessage(){
        return this.page.getByPlaceholder('Your Message Here');
     }

     SubmitButton(){
        return this.page.locator('[data-qa="submit-button"]');
     }


    //Methods

    async clickContactUs(){
        await this.ContactUsButton().click();
    }

     async fillContactForm(name, email, subject, message){
        await this.EnterName().fill(name);
        await this.EnterEmail().fill(email);
        await this.EnterSubject().fill(subject);
        await this.EnterMessage().fill(message);
    }

        async submitForm(){
        await this.SubmitButton().click();
        }

    //Assertions


    getintouchAssertion(){
        return expect(this.page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
    }

    getFormSubmissionAssertion(){
        return expect(this.page.getByText('Success! Your details have been submitted successfully.')).toBeVisible();
    }
    
}
import { Given, When, Then } from '@cucumber/cucumber';
import {RandomCase} from '../Pages/randomCase.js';
import { genrateRandomEmail, genrateRandomUsername ,genrateMobileNumber} from '../Support/helperFuntion.js';

let randomPage;

Given('user click on contact us button', async function () {
    randomPage = new RandomCase(this.page);
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
    await randomPage.SubmitButton().click();
});
import { ElementFinder, element, by, browser } from 'protractor';
import { CommonFunctions } from '../commons/common-functions';

export class CreateAccount {

    commonFunctions: CommonFunctions;

    emailAddressTextBox: ElementFinder;
    passwordTextBox: ElementFinder;
    continueButton: ElementFinder;
    confirmationCode = '5f7e84e4-c69f-4a0d-bd0b-d0362d2f58ec';

    constructor() {
        this.commonFunctions = new CommonFunctions();

        this.emailAddressTextBox = element(by.id('emailAddress'));

        this.passwordTextBox = element(by.id('password'));

        this.continueButton = element(by.xpath('//div[@class="buttonContainer"]//button[@tabindex="3"]'));
    }

    navigateTo() {
        browser.get('https://account.dynatrace.com/basweb/confirm?confirmation_code=' + this.confirmationCode + '');
    }

    navigateToBasedOnConfirmationCode(_confirmationCode: string) {
        browser.get('https://account.dynatrace.com/basweb/confirm?confirmation_code=' + _confirmationCode + '');
    }

    getEmailAddressTextboxValue() {
        return this.commonFunctions.getAttributeValue(this.emailAddressTextBox, 'value');
    }

    enterPassword(password: string) {
        this.commonFunctions.sendText(this.passwordTextBox, password);
    }

    clickContinueButton() {
        this.commonFunctions.click(this.continueButton);
    }
}

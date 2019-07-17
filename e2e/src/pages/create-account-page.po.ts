import { ElementFinder, element, by, browser } from 'protractor';
import { CommonFunctions } from '../commons/common-functions';

export class CreateAccount {

    commonFunctions: CommonFunctions;

    emailAddressTextBox: ElementFinder;
    passwordTextBox: ElementFinder;
    continueButton: ElementFinder;
    confirmationCode = '446db920-0e01-4d1c-9ad0-39b37b7d00cd';

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

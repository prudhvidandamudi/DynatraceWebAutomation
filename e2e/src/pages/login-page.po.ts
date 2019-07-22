import { ElementFinder, element, by } from 'protractor';
import { CommonFunctions } from '../commons/common-functions';

export class Login {

    commonFunctions: CommonFunctions;

    emailTextBox: ElementFinder;
    passwordTextBox: ElementFinder;
    nextButton: ElementFinder;
    loginButton: ElementFinder;
    logoImage: ElementFinder;
    invalidCredentialsErrorMessage: ElementFinder;

    constructor() {

        this.commonFunctions = new CommonFunctions();

        this.emailTextBox = element(by.id('email_verify'));
        this.passwordTextBox = element(by.id('password_login'));
        this.nextButton = element(by.id('next_button'));
        this.loginButton = element(by.id('no_captcha_submit'));
        this.logoImage = element(by.className('logo'));
        this.invalidCredentialsErrorMessage = element(by.id('error_message_label'));
    }

    enterEmailId(value: string) {
        this.commonFunctions.sendText(this.emailTextBox, value);
    }

    enterPassword(value: string) {
        this.commonFunctions.sendText(this.passwordTextBox, value);
    }

    clickNextButton() {
        this.commonFunctions.click(this.nextButton);
    }

    clickLoginButton() {
        this.commonFunctions.click(this.loginButton);
    }

    emailValidationMessage() {
        return this.commonFunctions.getAttributeValue(this.emailTextBox, 'validationMessage');
    }

    getInvalidCredentialsText() {
        return this.commonFunctions.getText(this.invalidCredentialsErrorMessage);
    }
}

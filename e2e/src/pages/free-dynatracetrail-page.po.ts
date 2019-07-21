import { browser, by, element, ElementFinder, $ } from 'protractor';
import { CommonFunctions } from '../commons/common-functions';

export class StartFreeTrail {

    commonFunctions: CommonFunctions;

    emaillAddressTextbox: ElementFinder;
    startFreeTrailButton: ElementFinder;
    messageElementStartFreeTrailClick: ElementFinder;
    hiddenCaptchaIframe: ElementFinder;
    visibleCaptchaIframe: ElementFinder;
    acceptCookiesButton: ElementFinder;

    constructor() {
        this.commonFunctions = new CommonFunctions();

        this.emaillAddressTextbox = element(by.xpath('(//input[@name="email"])[1]'));

        this.startFreeTrailButton = element(by.xpath('(//input[@type="submit"])[1]'));
        // $('.btn--secondary');

        this.messageElementStartFreeTrailClick = element(by.className('cta__message'));

        this.hiddenCaptchaIframe = element(by.xpath
            ('//div[contains(@style, "visibility: visible;")]//iframe[@title="recaptcha challenge"]'));

        this.visibleCaptchaIframe = element(by.xpath
            ('//div[contains(@style, "visibility: hidden;")]//iframe[@title="recaptcha challenge"]'));

        this.acceptCookiesButton = element(by.buttonText('Accept'));
    }

    enterEmailAddress(emailAddress: string) {
        this.commonFunctions.sendText(this.emaillAddressTextbox, emailAddress);
    }

    clickAcceptButton() {
        if (this.acceptCookiesButton.isDisplayed()) {
            this.commonFunctions.click(this.acceptCookiesButton);
        }
    }

    clickStartFreeTrail() {
        this.commonFunctions.click(this.startFreeTrailButton);
    }

    messageAfterStartFreeTrailClick() {
        return this.commonFunctions.getText(this.messageElementStartFreeTrailClick);
    }

    emailValidationMessage() {
        return this.commonFunctions.getAttributeValue(this.emaillAddressTextbox, 'validationMessage');
    }

    hiddenCaptchaIframeIsPresent() {
        return this.hiddenCaptchaIframe.isPresent();
    }

    visibleCaptchaIframeIsPresent() {
        return this.hiddenCaptchaIframe.isPresent();
    }
}

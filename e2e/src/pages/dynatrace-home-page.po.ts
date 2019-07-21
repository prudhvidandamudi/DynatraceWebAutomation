import { browser, by, element, ElementFinder } from 'protractor';
import { CommonFunctions } from '../commons/common-functions';

export class HomePage {

  commonFunctions: CommonFunctions;

  freeTrailButton: ElementFinder;
  saasLoginButton: ElementFinder;
  acceptCookiesButton: ElementFinder;

  constructor() {
    this.commonFunctions = new CommonFunctions();

    this.freeTrailButton = element(by.className('btn btn--navbar'));
    this.saasLoginButton = element(by.linkText('SaaS login'));
    this.acceptCookiesButton = element(by.buttonText('Accept'));
  }

  navigateTo() {
    return browser.get('/');
  }

  clickAcceptButton() {
    if (this.acceptCookiesButton.isDisplayed()) {
        this.commonFunctions.click(this.acceptCookiesButton);
    }
}

  clickFreeTrailButton() {
    this.commonFunctions.click(this.freeTrailButton);
  }

  clickSaasLoginButton() {
    this.commonFunctions.click(this.saasLoginButton);
  }
}

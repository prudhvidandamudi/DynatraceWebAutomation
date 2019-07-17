import { browser, by, element, ElementFinder } from 'protractor';
import { CommonFunctions } from '../commons/common-functions';

export class HomePage {

  commonFunctions: CommonFunctions;

  freeTrailButton: ElementFinder;
  saasLoginButton: ElementFinder;

  constructor() {
    this.commonFunctions = new CommonFunctions();

    this.freeTrailButton = element(by.className('btn btn--navbar'));
    this.saasLoginButton = element(by.linkText('SaaS login'));
  }

  navigateTo() {
    return browser.get('/');
  }

  clickFreeTrailButton() {
    this.commonFunctions.click(this.freeTrailButton);
  }

  clickSaasLoginButton() {
    this.commonFunctions.click(this.saasLoginButton);
  }
}

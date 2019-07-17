import { HomePage } from '../pages/dynatrace-home-page.po';
import { StartFreeTrail } from '../pages/free-dynatracetrail-page.po';
import { CreateAccount } from '../pages/create-account-page.po';
import { dynatraceTrailPageAssertData } from '../apptestdata/assertdata';
import { CommonFunctions } from '../commons/common-functions';
import { browser } from 'protractor';

describe('Dynatrace Trail Page Testsuite', () => {
  let homePage: HomePage;
  let startFreeTrail: StartFreeTrail;
  let commonFunctions: CommonFunctions;
  let createAccount: CreateAccount;

  beforeAll(() => {
    homePage = new HomePage();
    startFreeTrail = new StartFreeTrail();
    createAccount = new CreateAccount();
    commonFunctions = new CommonFunctions();
  });

  it('Email not provided', () => {
    browser.waitForAngularEnabled(false);
    homePage.navigateTo();
    homePage.clickFreeTrailButton();
    startFreeTrail.clickStartFreeTrail();
    expect(startFreeTrail.emailValidationMessage()).toBe(dynatraceTrailPageAssertData.noEmailAddressMessage);
  });

  it('Invalid email without @', () => {
    startFreeTrail.enterEmailAddress('email');
    startFreeTrail.clickStartFreeTrail();
    expect(startFreeTrail.emailValidationMessage()).toContain(dynatraceTrailPageAssertData.missingAtSymbolMessage);
  });

  it('Invalid email without domain', () => {
    startFreeTrail.enterEmailAddress('email@');
    startFreeTrail.clickStartFreeTrail();
    expect(startFreeTrail.emailValidationMessage()).toContain(dynatraceTrailPageAssertData.noDomainNameAfterAtSymbolMessage);
  });

  it('Invalid email with invalid domain name', () => {
    startFreeTrail.enterEmailAddress('email@12');
    startFreeTrail.clickStartFreeTrail();
    commonFunctions.wait(500);
    if (!startFreeTrail.visibleCaptchaIframeIsPresent) {
      expect(startFreeTrail.messageAfterStartFreeTrailClick()).toContain(dynatraceTrailPageAssertData.invalidEmailAddressMessage);
    } else {
      console.log('Unable to validate message due to captcha is visible.');
    }
  });

  it('clicking startfree trail', () => {
    browser.waitForAngularEnabled(false);
    homePage.navigateTo();
    homePage.clickFreeTrailButton();
    const emailAddress = generateEmailAddress();
    startFreeTrail.enterEmailAddress(emailAddress);
    startFreeTrail.clickStartFreeTrail();

    if (!startFreeTrail.visibleCaptchaIframeIsPresent) {
      createAccount.getEmailAddressTextboxValue().then((emailAddressValue) => {
        expect(emailAddressValue).toBe(emailAddress);
      });
    } else {
      console.log('Unable to validate Free Trail Button due to presense of captcha');
    }
  });

  function generateEmailAddress() {
    return 'email' + Math.floor(Date.now() / 1000) + '@ruxitlabs.com';
  }
});

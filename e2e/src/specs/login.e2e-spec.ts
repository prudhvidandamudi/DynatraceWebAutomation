import { HomePage } from '../pages/dynatrace-home-page.po';
import { DeployDynatrace } from '../pages/deploy-dynatrace-page.po';
import { Login } from '../pages/login-page.po';
import { dynatraceTrailPageAssertData } from '../apptestdata/assertdata';
import { createAccountDetailsData } from '../apptestdata/testdata';
import { CommonFunctions } from '../commons/common-functions';
import { browser } from 'protractor';

describe('Login Page Testsuite', () => {
    let homePage: HomePage;
    let login: Login;
    let deployDynatrace: DeployDynatrace;
    let commonFunctions: CommonFunctions;

    beforeAll(() => {
        homePage = new HomePage();
        login = new Login();
        deployDynatrace = new DeployDynatrace();
        commonFunctions = new CommonFunctions();

        browser.waitForAngularEnabled(false);
        homePage.navigateTo();
    });

    it('Clicking SaaS login button should land us to the login page', () => {
        homePage.clickSaasLoginButton();
        expect(login.logoImage.isPresent()).toBe(true);
    });

    it('Email address validations', () => {
        login.clickNextButton();
        expect(login.emailValidationMessage()).toBe(dynatraceTrailPageAssertData.noEmailAddressMessage);
    });

    it('Invalid email without @', () => {
        login.enterEmailId('email');
        login.clickNextButton();
        expect(login.emailValidationMessage()).toContain(dynatraceTrailPageAssertData.missingAtSymbolMessage);
    });

    it('Invalid email without domain', () => {
        login.enterEmailId('email@');
        login.clickNextButton();
        expect(login.emailValidationMessage()).toContain(dynatraceTrailPageAssertData.noDomainNameAfterAtSymbolMessage);
    });

    it('Invalid credentials', () => {
        login.enterEmailId('email@12');
        login.clickNextButton();
        login.enterPassword(createAccountDetailsData.password);
        login.clickLoginButton();
        expect(login.getInvalidCredentialsText()).toBe(dynatraceTrailPageAssertData.invalidCredentials);
    });

});

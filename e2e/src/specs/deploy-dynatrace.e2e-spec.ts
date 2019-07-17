import { CreateAccount } from '../pages/create-account-page.po';
import { AccountDetails } from '../pages/account-details-page.po';
import { RegionDetails } from '../pages/region-details-page.po';
import { DynatraceWelcomePage } from '../pages/dynatrace-welcome-page';
import { DeployDynatrace } from '../pages/deploy-dynatrace-page.po';
import { createAccountDetailsData, accountDetailsData, regionDetailsData } from '../apptestdata/testdata';
import { createAccountAssertData, dynatraceWelcomePageAssertData, deployDynatraceAssertData } from '../apptestdata/assertdata';
import { browser } from 'protractor';
import { CommonFunctions } from '../commons/common-functions';

describe('Create Account and Deploy Dynatrace Testsuite', () => {
    let createAccount: CreateAccount;
    let accountDetails: AccountDetails;
    let regionDetails: RegionDetails;
    let dynatraceWelcomePage: DynatraceWelcomePage;
    let deployDynatrace: DeployDynatrace;
    let commonFunctions: CommonFunctions;

    beforeAll(() => {
        createAccount = new CreateAccount();
        accountDetails = new AccountDetails();
        regionDetails = new RegionDetails();
        dynatraceWelcomePage = new DynatraceWelcomePage();
        deployDynatrace = new DeployDynatrace();
        commonFunctions = new CommonFunctions();
        browser.waitForAngularEnabled(false);
        createAccount.navigateToBasedOnConfirmationCode(createAccountDetailsData.confirmationCode);
    });

    it('Create account by filling all the required fileds', () => {
        createAccount.enterPassword(createAccountDetailsData.validPassword);
        createAccount.clickContinueButton();
        expect(accountDetails.getFormTitle()).toBe(createAccountAssertData.accountDetailsFormTitle);
        accountDetails.enterFirstName(accountDetailsData.firstName);
        commonFunctions.wait(400);
        accountDetails.enterLastName(accountDetailsData.lastName);
        accountDetails.enterCompany(accountDetailsData.company);
        accountDetails.selectCountry(accountDetailsData.country);
        accountDetails.selectState(accountDetailsData.state);
        accountDetails.clickContinueButton();
        expect(regionDetails.getFormTitle()).toBe(createAccountAssertData.regionDetailsFormTitle);
        commonFunctions.wait(400);
        regionDetails.selectRegion(regionDetailsData.usEastVirginia);
        regionDetails.selectYesOrNo(regionDetailsData.selectYesRadioButton);
        commonFunctions.wait(100);
        regionDetails.clickContuinue();
        expect(dynatraceWelcomePage.getFormTitle()).toBe(dynatraceWelcomePageAssertData.title + accountDetailsData.firstName);
    });

    it('Clicking Deploy dynatrace button should land us on deploy dynatrace page', () => {
        dynatraceWelcomePage.clickDeployDynatraceButton();
        expect(deployDynatrace.getWelcomeText()).toBe(deployDynatraceAssertData.title);
    });
});

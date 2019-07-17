import { CreateAccount } from '../pages/create-account-page.po';
import { AccountDetails } from '../pages/account-details-page.po';
import { RegionDetails } from '../pages/region-details-page.po';
import { createAccountDetailsData, accountDetailsData, regionDetailsData } from '../apptestdata/testdata';
import { createAccountAssertData, dynatraceTrailPageAssertData } from '../apptestdata/assertdata';
import { browser } from 'protractor';
import { CommonFunctions } from '../commons/common-functions';

describe('Create Account and Region Selection Page Testsuite', () => {
    let createAccount: CreateAccount;
    let accountDetails: AccountDetails;
    let regionDetails: RegionDetails;
    let commonFunctions: CommonFunctions;

    beforeAll(() => {
        createAccount = new CreateAccount();
        accountDetails = new AccountDetails();
        regionDetails = new RegionDetails();
        commonFunctions = new CommonFunctions();
        browser.waitForAngularEnabled(false);
        createAccount.navigateTo();
    });

    it('Checking Email Address field if value is populated', () => {
        createAccount.getEmailAddressTextboxValue().then((emailAddressValue) => {
            expect(emailAddressValue).toBeTruthy();
        });
    });

    it('Entering a three digit password should disable continue button', async () => {
        createAccount.enterPassword(createAccountDetailsData.threeDigitPassword);
        expect(createAccount.continueButton.getAttribute('disabled')).toEqual('true');
    });

    it('Entering a lowercase password should disable continue button', () => {
        createAccount.enterPassword(createAccountDetailsData.passwordwithlowercase);
        expect(createAccount.continueButton.getAttribute('disabled')).toEqual('true');
    });

    it('Entering a password without number or special charatcers should disable continue button', () => {
        createAccount.enterPassword(createAccountDetailsData.passwordWithoutNumberOrSpecialCharacters);
        expect(createAccount.continueButton.getAttribute('disabled')).toEqual('true');
    });

    it('Entering a valid password should enable continue button', () => {
        createAccount.enterPassword(createAccountDetailsData.validPassword);
        expect(createAccount.continueButton.getAttribute('disabled')).toEqual(null);
    });

    it('Clicking continue button on create account page should land us on account details page', () => {
        if (expect(createAccount.continueButton.getAttribute('disabled')).toEqual(null)) {
            createAccount.clickContinueButton();
            expect(accountDetails.getFormTitle()).toBe(createAccountAssertData.accountDetailsFormTitle);
        }
    });

    it('Country should be mandatory', () => {
        accountDetails.enterFirstName(accountDetailsData.firstName);
        accountDetails.enterLastName(accountDetailsData.lastName);
        accountDetails.enterCompany(accountDetailsData.company);
        accountDetails.enterPhoneNumber(accountDetailsData.phoneNumber);
        expect(accountDetails.continueButton.getAttribute('disabled')).toEqual('true');
    });

    it('For Canada and USA State should be mandatory', () => {
        accountDetails.selectCountry(accountDetailsData.country);
        expect(accountDetails.continueButton.getAttribute('disabled')).toEqual('true');
    });

    it('First name should be mandatory', () => {
        accountDetails.firstNameTextBox.clear();
        accountDetails.selectState(accountDetailsData.state);
        expect(accountDetails.continueButton.getAttribute('disabled')).toEqual('true');
    });

    it('Last name should be mandatory', () => {
        accountDetails.enterFirstName(accountDetailsData.firstName);
        accountDetails.lastNameTextBox.clear();
        expect(accountDetails.continueButton.getAttribute('disabled')).toEqual('true');
    });

    it('Company should be mandatory', () => {
        accountDetails.enterLastName(accountDetailsData.lastName);
        accountDetails.companyTextBox.clear();
        expect(accountDetails.continueButton.getAttribute('disabled')).toEqual('true');
    });

    it('Phone Number should be optional', () => {
        accountDetails.enterCompany(accountDetailsData.company);
        accountDetails.phoneNumberTextBox.clear();
        expect(accountDetails.continueButton.getAttribute('disabled')).toEqual(null);
    });

    it('Phone Number should be between 7 and 19 characters', () => {
        accountDetails.enterPhoneNumber(accountDetailsData.invalidphoneNumber);
        commonFunctions.wait(500);
        expect(accountDetails.continueButton.getAttribute('disabled')).toEqual('true');
        accountDetails.phoneNumberTextBox.clear();
    });

    it('Clicking continue button on account details page should land us on region details page', () => {
        if (expect(accountDetails.continueButton.getAttribute('disabled')).toEqual(null)) {
            accountDetails.clickContinueButton();
            expect(regionDetails.getFormTitle()).toBe(createAccountAssertData.regionDetailsFormTitle);
        }
    });

    it('Create account button should be in disabled state', () => {
        expect(regionDetails.createAccountButton.getAttribute('disabled')).toEqual('true');
    });

    it('Create account button should be enabled after selecting region and agreeing to terms and conditions', () => {
        commonFunctions.wait(500);
        regionDetails.selectRegion(regionDetailsData.usEastVirginia);
        regionDetails.selectYesOrNo(regionDetailsData.selectYesRadioButton);
        expect(regionDetails.createAccountButton.getAttribute('disabled')).toEqual(null);
    });

    it('Create Account should be in disabled state after selecting region, but not agreeing to terms and conditons', () => {
        regionDetails.selectRegion(regionDetailsData.usWestOregon);
        regionDetails.selectYesOrNo(regionDetailsData.selectNoRadioButton);
        expect(regionDetails.createAccountButton.getAttribute('disabled')).toEqual('true');
    });

    it('Click cancel button should take us back to the dynatrace trail page', () => {
        regionDetails.clickCancel();
        const url = browser.getCurrentUrl();
        expect(url).toBe(dynatraceTrailPageAssertData.dynatraceUrl);
    });
});

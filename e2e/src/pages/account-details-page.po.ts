import { ElementFinder, element, by } from 'protractor';
import { CommonFunctions } from '../commons/common-functions';

export class AccountDetails {

    commonFunctions: CommonFunctions;

    titleText: ElementFinder;
    firstNameTextBox: ElementFinder;
    lastNameTextBox: ElementFinder;
    companyTextBox: ElementFinder;
    countryDropdownButton: ElementFinder;
    stateDropdownButton: ElementFinder;
    phoneNumberTextBox: ElementFinder;
    promoCodeTextBox: ElementFinder;
    continueButton: ElementFinder;

    constructor() {
        this.commonFunctions = new CommonFunctions();

        this.titleText = element(by.xpath('//div[contains(text(),"account details")]'));
        this.firstNameTextBox = element(by.id('firstName'));
        this.lastNameTextBox = element(by.id('lastName'));
        this.companyTextBox = element(by.id('company'));
        this.countryDropdownButton = element(by.xpath('(//span[@class="iconbas-Dropdown_open"])[1]'));
        this.stateDropdownButton = element(by.xpath('(//span[@class="iconbas-Dropdown_open"])[2]'));
        this.phoneNumberTextBox = element(by.id('phoneNumber'));
        this.promoCodeTextBox = element(by.id('referralCode'));
        this.continueButton = element(by.xpath('//div[@class="buttonContainer"]//button[@tabindex="16"]'));
    }

    private getCountryOrStateBasedOnValue(value: string) {
        return element(by.xpath('//span[@value="' + value + '"]'));
    }

    getFormTitle() {
        return this.commonFunctions.getText(this.titleText);
    }

    enterFirstName(value: string) {
        this.commonFunctions.sendText(this.firstNameTextBox, value);
    }

    enterLastName(value: string) {
        this.commonFunctions.sendText(this.lastNameTextBox, value);
    }

    enterCompany(value: string) {
        this.commonFunctions.sendText(this.companyTextBox, value);
    }

    selectCountry(value: string) {
        this.commonFunctions.click(this.countryDropdownButton);
        this.commonFunctions.click(this.getCountryOrStateBasedOnValue(value));
    }

    selectState(value: string) {
        this.commonFunctions.click(this.stateDropdownButton);
        this.commonFunctions.click(this.getCountryOrStateBasedOnValue(value));
    }

    enterPhoneNumber(value: string) {
        this.commonFunctions.sendText(this.phoneNumberTextBox, value);
    }

    enterPartnerPromoCode(value: string) {
        this.commonFunctions.sendText(this.promoCodeTextBox, value);
    }

    clickContinueButton() {
        this.commonFunctions.click(this.continueButton);
    }

}

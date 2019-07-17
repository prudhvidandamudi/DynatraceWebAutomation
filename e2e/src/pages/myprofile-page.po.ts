import { ElementFinder, element, by } from 'protractor';
import { CommonFunctions } from '../commons/common-functions';

export class MyProfile {

    commonFunctions: CommonFunctions;

    formHeaderTitle: ElementFinder;
    firstNameTextBox: ElementFinder;
    lastNameTextBox: ElementFinder;
    phoneTextBox: ElementFinder;
    jobTitleTextBox: ElementFinder;
    cityTextBox: ElementFinder;
    timezoneDropdown: ElementFinder;
    toggleNotificationsButton: ElementFinder;
    saveButton: ElementFinder;

    constructor() {

        this.commonFunctions = new CommonFunctions();

        this.formHeaderTitle = element(by.xpath('//dt-card-title[text()="My profile"]'));
        this.firstNameTextBox = element(by.name('user.firstName'));
        this.lastNameTextBox = element(by.name('user.lastName'));
        this.phoneTextBox = element(by.name('user.phone'));
        this.jobTitleTextBox = element(by.name('user.jobTitle'));
        this.cityTextBox = element(by.name('user.city'));
        this.timezoneDropdown = element(by.name('user.timeZone'));
        this.toggleNotificationsButton = element(by.id('enable-notifications-checkbox0'));
        this.saveButton = element(by.xpath('(//span[text()="Save"])[1]'));
    }

    private getTimeZoneLocatorBasedOnValue(value) {
        return element(by.id('dt-option-' + value));
    }

    getFormHeaderTitleText() {
        return this.commonFunctions.getText(this.formHeaderTitle);
    }

    getFirstName() {
        return this.commonFunctions.getAttributeValue(this.firstNameTextBox, 'value');
    }

    getLastName() {
        return this.commonFunctions.getAttributeValue(this.lastNameTextBox, 'value');
    }

    getJobTitle() {
        return this.commonFunctions.getAttributeValue(this.jobTitleTextBox, 'value');
    }


    getCity() {
        return this.commonFunctions.getAttributeValue(this.cityTextBox, 'value');
    }


    enterFirstName(value: string) {
        this.commonFunctions.sendText(this.firstNameTextBox, value);
    }

    enterLastName(value: string) {
        this.commonFunctions.sendText(this.lastNameTextBox, value);
    }

    enterPhoneNumber(value: string) {
        this.commonFunctions.sendText(this.phoneTextBox, value);
    }

    enterJobTitle(value: string) {
        this.commonFunctions.sendText(this.jobTitleTextBox, value);
    }

    enterCity(value: string) {
        this.commonFunctions.sendText(this.cityTextBox, value);
    }

    selectTimezone(value?: string) {
        this.commonFunctions.click(this.timezoneDropdown);
        this.commonFunctions.wait(100);
        const randomTimeZoneValue = this.generateRandomTimeZoneValueToselect(value);
        this.commonFunctions.click(this.getTimeZoneLocatorBasedOnValue(randomTimeZoneValue));
    }

    clickToggleNotification() {
        this.commonFunctions.click(this.toggleNotificationsButton);
    }

    clickSaveButton() {
        this.commonFunctions.click(this.saveButton);
    }

    private generateRandomTimeZoneValueToselect(value?: string) {
        if (value !== null && typeof value !== 'undefined') {
            return value;
        } else {
            return Math.floor(244 + Math.random() * 20);
        }
    }


}

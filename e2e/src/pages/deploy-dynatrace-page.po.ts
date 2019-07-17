import { ElementFinder, element, by } from 'protractor';
import { CommonFunctions } from '../commons/common-functions';

export class DeployDynatrace {

    commonFunctions: CommonFunctions;
    dynatraceWelcomeText: ElementFinder;
    userMenuButton: ElementFinder;
    myProfileNavLink: ElementFinder;

    constructor() {
        this.commonFunctions = new CommonFunctions();
        this.dynatraceWelcomeText = element(by.xpath('//h1[contains(text(),"Deploy Dynatrace")]'));
        this.userMenuButton = element(by.xpath('//span[@uitestid="gwt-debug-userMenuButton"]'));
        this.myProfileNavLink = element(by.xpath('//div[@debugid="userName"]'));
    }

    getWelcomeText() {
        return this.commonFunctions.getText(this.dynatraceWelcomeText, 20000);
    }

    clickUserMenuButton() {
        this.commonFunctions.click(this.userMenuButton, 20000);
    }

    clickMyProfile() {
        this.commonFunctions.click(this.myProfileNavLink);
    }
}

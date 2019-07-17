import { ElementFinder, element, by } from 'protractor';
import { CommonFunctions } from '../commons/common-functions';
import { regionDetailsData } from '../apptestdata/testdata';

export class RegionDetails {
    commonFunctions: CommonFunctions;

    titleText: ElementFinder;
    agreeConditionsRadioButton: ElementFinder;
    disasgreeConditionsRadioButton: ElementFinder;
    createAccountButton: ElementFinder;
    cancelButton: ElementFinder;

    constructor() {
        this.commonFunctions = new CommonFunctions();

        this.titleText = element(by.xpath('//div[contains(text(),"your region")]'));
        this.agreeConditionsRadioButton = element(by.xpath('//div[@class="radio"]/label[@for="eulaYes"]'));
        this.disasgreeConditionsRadioButton = element(by.xpath('//div[@class="radio"]/label[@for="eulaNo"]'));
        this.createAccountButton = element(by.buttonText('Create account'));
        this.cancelButton = element(by.className('cancel_button'));
    }

    getRegionSelectionPin(region: string) {
        return element(by.xpath('//span[@class="pin" and @region="' + region + '"]'));
    }

    getFormTitle() {
        return this.commonFunctions.getText(this.titleText);
    }

    selectRegion(region: string) {
        this.commonFunctions.click(this.getRegionSelectionPin(region));
    }

    selectYesOrNo(option: string) {
        if (option === regionDetailsData.selectYesRadioButton) {
            this.commonFunctions.click(this.agreeConditionsRadioButton);
        } else {
            this.commonFunctions.click(this.disasgreeConditionsRadioButton);
        }
    }

    clickContuinue() {
        this.commonFunctions.click(this.createAccountButton);
    }

    clickCancel() {
        this.commonFunctions.click(this.cancelButton);
    }
}

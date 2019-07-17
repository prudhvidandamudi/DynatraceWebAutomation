import { ElementFinder, by, element } from 'protractor';
import { CommonFunctions } from '../commons/common-functions';

export class DynatraceWelcomePage {

    commonFunctions: CommonFunctions;
    titleText: ElementFinder;
    deployDynatraceButton: ElementFinder;

    constructor() {
        this.commonFunctions = new CommonFunctions();
        this.titleText = element(by.className('title'));
        this.deployDynatraceButton = element(by.id('buttonDeploy'));
    }

    clickDeployDynatraceButton() {
        this.commonFunctions.click(this.deployDynatraceButton, 40000);
    }

    getFormTitle() {
       return this.commonFunctions.getText(this.titleText);
    }
}

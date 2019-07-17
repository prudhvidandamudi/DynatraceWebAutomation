import { ElementFinder, protractor, browser } from 'protractor';

export class ExpectedConditions {

    time: number;
    constructor(timeInMilliSecs: number) {
        this.time = timeInMilliSecs;
    }

    // An expectation for checking that an element is present on the DOM of a page and visible.
    public async waitForElementToBeVisible(element: ElementFinder, timeInMilliSecs?: number) {
        this.checkToReplaceGlobalTimeIfRequired(timeInMilliSecs);
        const ec = protractor.ExpectedConditions;
        await browser.wait(ec.visibilityOf(element), this.time, 'Unable to find the element' + element.locator().toString());
    }

    // Method to replace Global time variable if required
    private async checkToReplaceGlobalTimeIfRequired(timeInMilliSecs: number) {
        if (timeInMilliSecs !== null && typeof timeInMilliSecs !== 'undefined') {
            this.time = timeInMilliSecs;
        }
    }
}

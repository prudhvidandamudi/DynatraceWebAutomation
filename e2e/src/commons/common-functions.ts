import { ElementFinder, browser } from 'protractor';
import { ExpectedConditions } from '../commons/expected-conditions';

export class CommonFunctions {

    expectedConditions: ExpectedConditions = new ExpectedConditions(10000);

    public async click(webElement: ElementFinder, timeInMilliSecs?: number) {
        try {
            this.expectedConditions.waitForElementToBeVisible(webElement, timeInMilliSecs);
            await webElement.click();
        } catch (error) {
            console.log('Error while clicking the element' + webElement.locator().toString() + 'Error:: ' + error);
        }
    }

    public async sendText(webElement: ElementFinder, inputText: string) {
        try {
            this.expectedConditions.waitForElementToBeVisible(webElement);
            this.moveToElement(webElement);
            await webElement.clear();
            await webElement.sendKeys(inputText);
        } catch (error) {
            console.log('Error while sending text to the element' + webElement.locator().toString() + 'Error:: ' + error);
        }
    }

    public async getText(webElement: ElementFinder, timeInMilliSecs?: number) {
        try {
            this.expectedConditions.waitForElementToBeVisible(webElement, timeInMilliSecs);
            return await webElement.getText();
        } catch (error) {
            console.log('Error while getting text from element' + webElement.locator().toString() + 'Error:: ' + error);
        }
    }

    public async getAttributeValue(webElement: ElementFinder, attributeName: string) {
        try {
            this.expectedConditions.waitForElementToBeVisible(webElement);
            return await webElement.getAttribute(attributeName);
        } catch (error) {
            console.log('Error while getting the attribute value of element' + webElement.locator().toString() + 'Error:: ' + error);
        }
    }

    public async moveToElement(webElement: ElementFinder) {
        await browser.actions().
            mouseMove(webElement).
            perform();
    }

    public wait(millisecs: number) {
        browser.sleep(millisecs);
    }
}

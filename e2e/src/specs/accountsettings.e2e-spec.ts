import { HomePage } from '../pages/dynatrace-home-page.po';
import { DeployDynatrace } from '../pages/deploy-dynatrace-page.po';
import { MyProfile } from '../pages/myprofile-page.po';
import { Login } from '../pages/login-page.po';
import { createAccountDetailsData, myProfilePageData } from '../apptestdata/testdata';
import { CommonFunctions } from '../commons/common-functions';
import { browser } from 'protractor';

describe('My Profile Page Test Suite', () => {
    let homePage: HomePage;
    let login: Login;
    let deployDynatrace: DeployDynatrace;
    let myProfile: MyProfile;
    let commonFunctions: CommonFunctions;


    beforeAll(() => {
        homePage = new HomePage();
        login = new Login();
        deployDynatrace = new DeployDynatrace();
        myProfile = new MyProfile();
        commonFunctions = new CommonFunctions();

        browser.waitForAngularEnabled(false);
        homePage.navigateTo();
        homePage.clickSaasLoginButton();
        login.enterEmailId(createAccountDetailsData.emailId);
        login.clickNextButton();
        login.enterPassword(createAccountDetailsData.password);
        login.clickLoginButton();
    });

    it('Clicking user menu button should navigate us to the My profile page', () => {
        deployDynatrace.clickUserMenuButton();
        deployDynatrace.clickMyProfile();
        expect(myProfile.getFormHeaderTitleText()).toBe(myProfilePageData.headerTitle);
    });

    it('Update my profile page and validate', () => {
        // myProfile.enterPhoneNumber(generateRandomNumber(8));
        const firstName = randonNameGenerator();
        const lastName = randonNameGenerator();
        const jobTitle = 'Senior Automation Engineer-' + generateRandomNumber(1);
        const city = randoCityGenerator();
        myProfile.enterFirstName(firstName);
        myProfile.enterLastName(lastName);
        myProfile.enterJobTitle(jobTitle);
        myProfile.enterCity(city);
        myProfile.selectTimezone();
        myProfile.clickToggleNotification();
        myProfile.clickSaveButton();
        commonFunctions.wait(1500);
        browser.refresh();
        expect(myProfile.getFirstName()).toBe(firstName);
        expect(myProfile.getLastName()).toBe(lastName);
        expect(myProfile.getJobTitle()).toBe(jobTitle);
        expect(myProfile.getCity()).toBe(city);
    });

    function generateRandomNumber(length) {
        let result = '';
        const characters = '1234567890';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function randonNameGenerator() {
        const names = ['peter', 'Krishna', 'Smith', 'Chris', 'Prudhvi', 'Richard', 'Dandamudi', 'Mc-Nutt', 'Chirstine', 'Duewke', 'Lee',
         'Patt', 'Gadgil'];
        const i = Math.floor(Math.random() * names.length);
        return names[i];
    }

    function randoCityGenerator() {
        const cities = ['Windsor', 'Detroit', 'Troy', 'Ottawa', 'Toronto', 'Calgary', 'Montreal', 'Halifax', 'Chatam', 'PEI', 'Edmonton',
         'Vancouer', 'Kingston'];
        const i = Math.floor(Math.random() * cities.length);
        return cities[i];
    }


});

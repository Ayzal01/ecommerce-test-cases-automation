const { test, expect } = require('@playwright/test');

class Checkout {

    constructor(page) {
        this.page = page

        this.checkoutButton = page.locator("//button[text()='Checkout']");
        this.creditcard = page.locator("div>input.input.txt.text-validated").nth(1);
        this.cardExpMonth = page.locator("//select[@class='input ddl']").nth(0);
        this.cardExpDate = page.locator("//select[@class='input ddl']").nth(1);
        this.csv = page.locator("div>input.input.txt").nth(1);
        this.name = page.locator("div>input.input.txt").nth(2);
        this.coupon = page.locator("div>input.input.txt").nth(3);
        this.applyCouponButton = page.locator("//button[text()='Apply Coupon']");
        this.selectCountry = page.locator("//input[@class='input txt text-validated']").nth(1);
        this.list = page.locator("//section[@class='ta-results list-group ng-star-inserted']");
        this.countryList = page.locator("section button.ta-item.list-group-item.ng-star-inserted");
        this.placeOrder = page.locator("//a[@class='btnn action__submit ng-star-inserted']");
        this.msg=page.locator(" //h1[@class='hero-primary']");
        this.orderid= page.locator("//label[@class='ng-star-inserted']");



    }

    async CheckouttheItems() {
        await this.checkoutButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.checkoutButton.click();
        await this.page.waitForLoadState('networkidle', { timeout: 9000 });
        await this.creditcard.clear();
        await this.creditcard.fill('1234678625637');
        await this.cardExpMonth.click();
        await this.cardExpMonth.selectOption("11");
        await this.cardExpDate.selectOption('27');
        await this.csv.fill("678");
        await this.name.fill("A NOMAN");
        await this.coupon.fill("HK1235");
        await this.applyCouponButton.click();
        await this.page.waitForSelector('div.ngx-spinner-overlay', { state: 'hidden', timeout: 150000 });
        await this.selectCountry.waitFor({ state: 'visible', timmeout: 10000 });
        await this.selectCountry.click();
        await this.selectCountry.pressSequentially('pa');
        await this.list.waitFor({ state: 'visible', timeout: 10000 });
        const countryCount = await this.countryList.count();
        await console.log("my conuntry list", `${countryCount}`)


        for (let i = 0; i < countryCount; i++) {

            const myCountry = await this.countryList.nth(i).textContent()

            if (myCountry.trim() === 'Pakistan') {

                await this.countryList.nth(i).click();
                break;

            }

        }
        await this.placeOrder.click();
     



    }








}
module.exports = Checkout;
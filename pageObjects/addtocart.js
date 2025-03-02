
const { test, expect } = require('@playwright/test');
const { TIMEOUT } = require("dns");


class AddToCart {

    constructor(page) {
        this.page = page;
        this.dashboard = page.locator(".card-body").first();
        this.selectItem = page.locator(".card-body");
        this.cartButton = page.locator("//button[@class='btn btn-custom' and contains(normalize-space(text()), 'Cart')]");
        this.prodName = page.locator("//b[text()='ZARA COAT 3']");
        this.orderPage = page.locator("div>ul").first();
        this.addedItem = page.locator("//h3[text()='ZARA COAT 3']");



    }

    async gotoDashboard() {
        await this.page.waitForLoadState('networkidle');
        await this.dashboard.waitFor({ state: 'visible' }, { timeout: 35000 });

    }

    async addtocartbuckit(pname) {

        const totalItems = await this.selectItem.count();
        for (let i = 0; i < totalItems; i++) {
            const itemText = await this.selectItem.nth(i).locator('b').textContent();
            if (itemText === pname) {

                await this.selectItem.nth(i).scrollIntoViewIfNeeded();
                const addToCartButtonForItems = await this.selectItem.nth(i).locator("text=Add To Cart");
                await addToCartButtonForItems.waitFor({ state: 'visible', timeout: 5000 });
                await addToCartButtonForItems.click();
                await this.page.waitForLoadState('networkidle');


                break;

            }

        }
        await this.cartButton.waitFor({ state: 'visible', timeout: 5000 })
        await this.cartButton.click();

    }

    getproductlocator(pname) {
        return this.page.locator(`h3:has-text('${pname}')`);

    }


    async verifyProductdisplayed(pname) {
        await this.orderPage.waitFor({ state: 'visible', timeout: 5000 })
        const bool = await this.getproductlocator(pname).isVisible();
        expect(bool).toBeTruthy();
    }

}
module.exports = AddToCart;

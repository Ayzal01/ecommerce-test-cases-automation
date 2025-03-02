class Order {

    constructor(page) {
        this.page = page;
        this.orderHistorybutton = page.locator("//label[text()=' Orders History Page ']");
        this.orderslist = page.locator("tbody>tr.ng-star-inserted").nth(1);
        this.rows = page.locator("tbody tr");
        this.deliveryCountry = page.locator("//p[text()=' Country - Pakistan ']").nth(1);
        this.orderid = page.locator("//div[@class='col-text -main']");
        this.ordername = page.locator(".artwork-card-info .title");

    }



    async gotoorderHistorypage(OrderTransactionId) {
        await this.page.waitForLoadState('networkidle');
        await this.orderHistorybutton.click();
        await this.page.waitForLoadState('networkidle');
        await this.orderslist.waitFor({ state: 'visible', timeout: 9000 });
        const totalrows = await this.rows.count();

        for (let i = 0; i < totalrows; i++) {

            const completeRow = await this.rows.nth(i).locator("th").textContent();

            if (OrderTransactionId.includes(completeRow)) {

                await this.rows.nth(i).locator("//button[@class='btn btn-primary']").first().click();
                break;
            }



        }


    }

    async getDeliveryCountry(){
        return await this.deliveryCountry.textContent();
    }

    async getOrderID(){
        return await this.orderid.textContent();
    }

    async getOrderName(){
        return await this.ordername.textContent();
    }

}





module.exports = Order;
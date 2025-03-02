class ULBasics {

    constructor(page) {
        this.page = page;
        this.userID = page.locator("#username");
        this.Password = page.locator("#password");
        this.radioButton = page.locator("//span[@class='checkmark']").nth(1);
        this.popUp = page.locator("//button[@id='okayBtn']");
        this.dropDown = page.locator("select.form-control");
        this.dropDownOptions = page.locator("[value = 'consult']");
        this.checkBox = page.locator("//input[@id='terms']");
        this.link = page.locator("[href*='documents-request']");
        this.signInButton = page.locator("//input[@class='btn btn-info btn-md']");

    }

    async validLogin(name, pass) {

        await this.userID.fill(name);
        await this.Password.fill(pass);
        await this.radioButton.click();
        await this.popUp.click();
        await this.dropDown.click();
        await this.dropDown.selectOption({ value: 'consult' });
        await this.checkBox.click();
        await this.signInButton.click();
    }


    async blinkingLink() {
        return await this.link.isVisible();

    }


}
module.exports = ULBasics;
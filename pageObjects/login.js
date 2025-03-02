class LoginPage {

    constructor(page) {

        this.page = page;
        this.useremail = page.locator("#userEmail");
        this.userpassword = page.locator("#userPassword");
        this.loginButton = page.locator("#login");

    }


    async website() {
        await this.page.goto("https://rahulshettyacademy.com/client" , {timeout: 40000});
        await this.page.waitForLoadState('networkidle', {timeout: 20000});
     
    }

    async login(userid, userpassword) {
        await this.useremail.fill(userid);
        await this.userpassword.fill(userpassword);
        await this.loginButton.click();
        await this.page.waitForURL('https://rahulshettyacademy.com/client/dashboard/dash');
    }



}
module.exports =  LoginPage;
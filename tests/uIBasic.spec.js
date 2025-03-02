const { test, expect } = require('@playwright/test');
const ULBasics = require('../pageObjects/uIBasic');

test("UI Basics", async ({ page }) => {
    const name = "rahulshettyacademy";
    const pass = "learning";
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const basics = new ULBasics(page);

    await basics.validLogin(name, pass);
    await expect(basics.radioButton).toBeChecked();
    await expect(basics.checkBox).toBeChecked();
    await expect(basics.link).toHaveAttribute("class", "blinkingText");
    const bool = await basics.blinkingLink();
    await expect(bool).toBeTruthy();

}, 20000);


test.only("Handling child windows not implemented POM for this test case", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const link = page.locator("[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const [page2] = await Promise.all([
        context.waitForEvent('page'),
        link.click(),
    ]);

    const text = await page2.locator("//p[@class='im-para red']").textContent();
    console.log("My Link", text);

    const arrayText = await text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log("My Id is", domain);
    await page.locator("#username").fill(domain)
    await page.pause();




})
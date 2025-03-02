const { expect, chromium } = require('@playwright/test');
const LoginPage = require('../../pageObjects/login');
const AddToCart = require('../../pageObjects/addtocart');
const { Given, When, Then, setDefaultTimeout, AfterAll, BeforeAll } = require('@cucumber/cucumber');
const { before } = require('node:test');
setDefaultTimeout (40000);

let browser;
let login;
let page;
let context;
let addtocartitem ;



BeforeAll(async () => {
  console.log("Launching the browser...");
  browser = await chromium.launch({ headless: false });
  
  console.log("Creating a new browser context...");
  context = await browser.newContext();
  
  console.log("Opening a new page...");
  page = await context.newPage();
  
  // Create an instance of the LoginPage class
  
});





AfterAll (async () =>{
 

  if (browser) {
    await browser.close();
  }
});

//Login to App

Given(`User is on E commerce website's login page.`, async function () {
  login = new LoginPage(page);
  console.log("Navigating to the login page...");
  await login.website();
});


When(`User entered valid user id {string} and {string}`, async (username, password) => {
  await login.login(username, password);
});



 
Then(`User should be logon and redirect to dashboard page.`, async function () {
  const dashboardUrl = 'https://rahulshettyacademy.com/client/dashboard/dash';
  await page.waitForURL(dashboardUrl);
  expect(page.url()).toBe(dashboardUrl);
  
});




// Scenario 2: Add to cart

  Given(`User is logged in`, async function () {

 addtocartitem = new AddToCart(page);
    
  });


  When(`user selected few items from dashboard and hit on addtocart button`, async function () {
    
    await addtocartitem.addtocartbuckit();
     await addtocartitem.orderPage.waitFor();
      await expect (addtocartitem.addedItem).toBeVisible();
  
  });



  Then(`user should see counter on add to cart button items should be added to the cart.`, async function () {
    
    
  });



const { test, expect } = require('@playwright/test')
const LoginPage = require('../pageObjects/login');
const AddToCart = require('../pageObjects/addtocart');
const Checkout = require('../pageObjects/checkout');
const Orders =require('../pageObjects/orders');


test.beforeEach("My Login Test Case", async ({ page }) => {
    const userid = "anshika@gmail.com";
    const userpassword = "Iamking@000";
    const login = new LoginPage(page);
    await login.website();
    await login.login(userid, userpassword);
}, 9000);


test("Add to cart, Checkout, and verify order summary", async ({ page }) => {
  // Add to cart
    const addtocart = new AddToCart(page);
    const pname= "ZARA COAT 3";
    await addtocart.gotoDashboard();
    await addtocart.addtocartbuckit(pname);
    await addtocart.verifyProductdisplayed(pname);
   

  // Checkout and place order
    const Checkoutitem = new Checkout(page);
    await Checkoutitem.CheckouttheItems();
    await expect(Checkoutitem.msg).toHaveText(" Thankyou for the order. ");      
    const OrderTransactionId = await Checkoutitem.orderid.textContent();
    console.log(OrderTransactionId);

    // Orders, order history page
    const orderno = new Orders(page);
    await orderno.gotoorderHistorypage(OrderTransactionId);

    // Verify Ordersummary
    const deliveryCountry = await orderno.getDeliveryCountry();
    await expect(deliveryCountry).toContain("Pakistan");

    const orderid = await orderno.getOrderID();
    await expect(orderid).toBeTruthy();

    const ordername = await orderno.getOrderName();
    await expect(orderno.ordername).toBeVisible();
    await expect(orderno.ordername).toHaveText(" ZARA COAT 3 ");
    console.log("looks good");
    

});
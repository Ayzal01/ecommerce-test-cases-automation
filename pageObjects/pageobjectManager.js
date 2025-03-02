const LoginPage = require('../pageObjects/login');
const AddToCart = require('../pageObjects/addtocart');
const Checkout = require('../pageObjects/checkout');
const Orders =require('../pageObjects/orders');

class PageObjectManager{
    constructor(page){

        this.page = page;
        const login = new LoginPage(this.page);
        const addtocart = new AddToCart(this.page);
        const Checkoutitem = new Checkout(this.page);
        const orderno = new Orders(this.page);
    }



}

module.exports = PageObjectManager;
    

Feature: Ecomerce Checkout Functionality

  @login
  Scenario: Verify Login with valid credentials
    Given User is on E commerce website's login page.
    When User entered valid user id "anshika@gmail.com" and "Iamking@000"
    Then User should be logon and redirect to dashboard page.

  @addtocart
  Scenario: Verify add to cart functionality
    Given User is logged in
    When user selected few items from dashboard and hit on addtocart button
    Then user should see counter on add to cart button items should be added to the cart.

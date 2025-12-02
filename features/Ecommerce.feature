Feature: Ecommerce Validation
    @Regression
    Scenario: Placing the Order
        Given a login to Ecommerce application with "avishkargawali120@gmail.com" and "Avishkar9730"
        When Add "Zara Coat 3" to Cart
        Then Verify "zara coat 3" is displayed in the cart
        When Enter valid details and Place the order
        Then Verify order in present in orderHistory

    @Validation
    Scenario: Placing the Order
        Given a login to Ecommerce2 application with "avishkargawali120@gmail.com" and "Avishkar9730"
        Then verify error message is displayed
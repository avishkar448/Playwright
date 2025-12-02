Feature: Ecommerce Validation
    @ErrorValidation
    Scenario: Placing the Order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then verify error message is displayed

        Examples:
            | username                     | password      |
            | avishkargawali120@gmail.com  | Avishkar9730  |
            |  xyz12@gmail.com             | 98745621      |
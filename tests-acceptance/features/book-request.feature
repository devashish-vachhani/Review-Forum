Feature: Submitting a textbook request
    As a registered user
    I want to be able to provide information on a textbook not on the website
    So that I can submit it to be added to the website


    Scenario: textbook submission
        Given I am at the Book Request Page
        And a text box asking for the textbook’s title
        And a description box 
        And a text box asking for the textbook's author
        And I can select my university name
        And I can select my cooresponding course 
        And an image url box 
        And I click the submit button
        Then I'm sent back to the books page after submitting

    Scenario: requesting a book (Service)
        Given the system does not have a book with the name "Amazing Code"
        When I create a request for the book "Amazing Code" to be added
        Then the system now stores a book with the title "Amazing Code" and a status of "pending"




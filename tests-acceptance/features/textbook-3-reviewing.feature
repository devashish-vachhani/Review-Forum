Feature: Reviewing a textbook
     As a registered user
     I want to be able to provide feedback on a textbook
     So that other users can see my review


     Scenario: reviewing 
          Given I am at a textbook’s page
          When I click the review button
          And type in the review 
          Then my review is posted if I click post

     Scenario: Creating a book review (Service)
        Given the system has a book with no reviews
        When I create a 4 star review from user "John" with the text "good book"
        Then the system now stores a 4 star review from "John" with the text "good book"

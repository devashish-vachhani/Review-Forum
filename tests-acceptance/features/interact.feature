Feature: Searching for and interacting with a textbook page
    As a registered user
    I want to be able to locate textbooks
    So that I can access a textbook's page and perform actions on it

    Scenario: searching by text
        Given I am at the website’s search page
        When I enter a title in the textbook’s search bar
        And I click the search button
        Then I am redirected to a page with links to similar registered textbooks

    Scenario: searching by university
        Given I am at the website’s search page
        When I enter a name in the university’s search bar
        And I click the search button
        Then I am redirected to a page with links to books with similar registered universities

    Scenario: accessing a book page
        Given I am at the website’s search results page
        When I select a particular textbook listing
        Then I am directed to a page which has the image, name and the description of the textbook along with an average rating

    Scenario: liking a review
        Given I am at a book page with a review
        When I click the like button on a review
        Then the review has a like

    Scenario: commenting on a review
        Given I am at a book page with a review
        When I click the comment button on a review
        And I enter some text in the text-area
        Then my comment posts when I click the post button

    Scenario: adding a book to your reading list
        Given I am at a textbook’s page
        When I click the add to reading list button
        Then the book is added to my reading list
       
    Scenario: liking a review (Service)
        Given the system has a review on a book
        When I like the review as user "Bob"
        Then the system now stores a like by "Bob" for that review

    Scenario: adding a book to reading list (Service)
        Given the system has a book
        When I add the book to a user's reading list
        Then the system now stores the book in the user's reading list

    
    Scenario: commenting on a review (Service)
        Given the system has a review on a book
        When I add a comment to the review from "Bob" with the text "Good Review"
        Then the system now stores that comment from "Bob" for the review with the text "Good Review"


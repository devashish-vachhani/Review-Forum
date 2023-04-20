// IMPORTS
const importCwd = require('import-cwd');
const { Given, When, Then } = importCwd('@cucumber/cucumber');
const { browser, $, element, by, protractor } = require('protractor');
let chai = require('chai').use(require('chai-as-promised'));
let exp = chai.expect;
const request= require('request');
const axios = require('axios');
let tempPath = "";
let tempJson = {};

/**
 * Searching and actions feature
 */

// Given I am at the website’s home page 
Given(/^I am at the website’s search page$/, async () => {
    await login()
});

// When I enter a title in the textbook’s search bar
When(/^I enter a title in the textbook’s search bar$/, async () => {
    await element(by.css('input[name="searchTerm"]')).sendKeys('Algorithms');
});

// And I click the search button
Then(/^I click the search button$/, async () => {
    await element(by.css('button[type="submit"]')).click();
});

// Then I am redirected to a page with links to similar registered textbooks
Then(/^I am redirected to a page with links to similar registered textbooks$/, async () => {
    var EC = protractor.ExpectedConditions
    await browser.wait(EC.urlContains('http://localhost:4200/books?title=Algorithms'), 5000)
    await exp(browser.getCurrentUrl()).to.eventually.equal("http://localhost:4200/books?title=Algorithms")
});

// When I enter a name in the university’s search bar 
When(/^I enter a name in the university’s search bar$/, async () => {
    var EC = protractor.ExpectedConditions
    await browser.wait(EC.visibilityOf(element(by.name('searchMode'))), 5000)
    await element(by.name('searchMode')).click();
    await element(by.css('[value="byUniversity"]')).click();
    await element(by.name("searchTerm")).click();
    await element(by.css('[ng-reflect-value="NCSU"]')).click();
});

// Then I am redirected to a page with links to similar registered universities
Then(/^I am redirected to a page with links to books with similar registered universities$/, async () => {
    var EC = protractor.ExpectedConditions
    await browser.wait(EC.urlContains('http://localhost:4200/books?university=NCSU'), 5000)
    await exp(browser.getCurrentUrl()).to.eventually.equal("http://localhost:4200/books?university=NCSU")
});

// Given I am at the website’s search results page 
Given(/^I am at the website’s search results page$/, async () => {
    await browser.get("http://localhost:4200/books?university=NCSU");
    var EC = protractor.ExpectedConditions
    await browser.wait(EC.urlContains('http://localhost:4200/books?university=NCSU'), 5000)
    await exp(browser.getCurrentUrl()).to.eventually.equal("http://localhost:4200/books?university=NCSU")
});

// When I select a particular textbook listing
When(/^I select a particular textbook listing$/, async () => {
    var EC = protractor.ExpectedConditions
    await browser.wait(EC.visibilityOf(element(by.css('[data-testid="view-btn"]'))), 5000)
    await element(by.css('[data-testid="view-btn"]')).click();
});

// And I am directed to a page which has the image, name and the description of the textbook along with an average rating
Then(/^I am directed to a page which has the image, name and the description of the textbook along with an average rating$/, async () => {
    var EC = protractor.ExpectedConditions
    await browser.wait(EC.visibilityOf(element(by.css('[data-testid="book-title"]'))), 5000)
    await exp(await element(by.css('[data-testid="book-title"]')).getText()).to.equal("Algorithms in C++")
    await exp(await element(by.css('[data-testid="book-author"]')).getText()).to.equal("Robert Sedgewick")
    await exp(await element(by.name('description')).getText()).to.equal("Building on widespread use of the C++ programming language in industry and education, this book provides a broad-based and case-driven study of data structures -- and the algorithms associated with them -- using C++ as the language of implementation. This book places special emphasis on the connection between data structures and their algorithms, including an analysis of the algorithms' complexity. It presents data structures in the context of object-oriented program design, stressing the principle of information hiding in its treatment of encapsulation and decomposition. The book also closely examines data structure implementation and its implications on the selection of programming languages.")
    await exp(await element(by.name('image')).getAttribute("src")).to.equal("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1392706439i/20837728.jpg")
    
});

Given(/^I am at a book page with a review$/, async () => {
    await browser.get("http://localhost:4200/book/s2grpxrNPaY8Ctg22jb1");

    var EC = protractor.ExpectedConditions
    await browser.wait(EC.urlContains('s2grpxrNPaY8Ctg22jb1'), 5000)
    await exp(browser.getCurrentUrl()).to.eventually.equal("http://localhost:4200/book/s2grpxrNPaY8Ctg22jb1")
});

// When I click the like button on a review
When(/^I click the like button on a review$/, async () => {
    var EC = protractor.ExpectedConditions
    await browser.wait(EC.visibilityOf(element(by.css('[data-testid="like-btn"]'))), 5000)
    const like = await element.all(by.css('[data-testid="like-btn"]')).get(-1)
    await browser.executeScript("arguments[0].click();", like)
    var EC = protractor.ExpectedConditions
    await browser.wait(EC.visibilityOf(element(by.css('[data-testid="dislike-btn"]'))), 5000)
});

// Then the review has a like
Then(/^the review has a like$/, async () => {
    const likes = await element.all(by.name('likeCount')).get(-1).getText()
    await exp(likes).to.equal('thumb_up\n1')
});

// When I click the comment button on a review
When(/^I click the comment button on a review$/, async () => {
    var EC = protractor.ExpectedConditions
    await browser.wait(EC.visibilityOf(element(by.css('[data-testid="toggle-comments-btn"]'))), 5000)
    const commentButton = await element.all(by.css('[data-testid="toggle-comments-btn"]')).get(-1)
    await browser.wait(EC.elementToBeClickable(element(by.css('[data-testid="toggle-comments-btn"]'))), 5000)
    await browser.executeScript("arguments[0].click();", commentButton)
    var EC = protractor.ExpectedConditions
    await browser.wait(EC.visibilityOf(element(by.name("text"))), 5000)
});

// And I enter some text in the text-area
Then(/^I enter some text in the text-area$/, async () => {
    var EC = protractor.ExpectedConditions
    await browser.wait(EC.visibilityOf(element(by.name("text"))), 5000)
    var commentTextBox = element(by.css('textarea[name="text"]'));
    commentTextBox.sendKeys('Great review!')
});

// Then my comment posts when I click the post button 
Then(/^my comment posts when I click the post button$/, async () => {
    var EC = protractor.ExpectedConditions
    await browser.wait(EC.visibilityOf(await element(by.buttonText('Post'))), 5000)
    var postButton = await element(by.buttonText('Post'));
    await browser.wait(EC.elementToBeClickable(await element(by.buttonText('Post'))), 5000)
    await browser.executeScript("arguments[0].click();", postButton)

    const comment = await element.all(by.css('.wrapper153')).get(1).getAttribute("innerText");
    exp(comment).to.equal("Great review!")

});

// When I click the add to reading list button
When(/^I click the add to reading list button$/, async () => {
    var EC = protractor.ExpectedConditions;
    await browser.wait(EC.elementToBeClickable(element(by.css('button[data-testid="add-btn"]'))), 5000);
    await element(by.css('button[data-testid="add-btn"]')).click()
    
});

// Then the book is added to my reading list
Then(/^the book is added to my reading list$/, async () => {
    var EC = protractor.ExpectedConditions;
    await browser.wait(EC.visibilityOf(element(by.css('button[data-testid="delete-btn"]'))), 5000);
    await exp(await element(by.css('button[data-testid="delete-btn"]')).getText()).to.equal("Remove from reading list")
});


/**
 * Submission Feature
 */

// Given I am at the Book Request Page
Given(/^I am at the Book Request Page$/, async () => {
    await login()
    await browser.get("http://localhost:4200/books/new");
});

// And a text box asking for the textbook’s title
Then(/^a text box asking for the textbook’s title$/, async () => {
    var EC = protractor.ExpectedConditions;
    await browser.wait(EC.visibilityOf($('#title')), 5000);
    await element(by.css('input[name="title"]')).sendKeys('Clean Code');
});

// And a description box 
Then(/^a description box$/, async () => {
    await element(by.css('textarea[name="description"]')).sendKeys('Noted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship . Martin has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code on the fly into a book that will instill within you the values of a software craftsman and make you a better programmer but only if you work at it.');
});

// And a text box asking for the textbook's author
Then(/^a text box asking for the textbook's author$/, async () => {
    await element(by.css('input[name="author"]')).sendKeys('Robert C. Martin');
});

// And I can select my university name
Then(/^I can select my university name$/, async () => {
    await element(by.css('select[name="university"]')).click();
    await element(by.cssContainingText('option', 'North Carolina State University')).click();
});

// And I can select my cooresponding course 
Then(/^I can select my cooresponding course$/, async () => {
    var EC = protractor.ExpectedConditions;
    await browser.wait(EC.visibilityOf($('#course')), 5000);
    await element(by.css('select[name="course"]')).click();
    await element(by.cssContainingText('option', 'CSC-510')).click();
});

// And an image
Then(/^an image url box$/, async () => {
    await element(by.css('input[name="image"]')).sendKeys('https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg');
});

// And I can click the submit button 
Then(/^I click the submit button$/, async () => {
    await element(by.css('button[type="submit"]')).click();
});

// Then I'm sent back to the books page after submitting
Then(/^I'm sent back to the books page after submitting$/, async () => {
    var EC = protractor.ExpectedConditions
    await browser.wait(EC.urlIs('http://localhost:4200/books'), 500000)
    await exp(browser.getCurrentUrl()).to.eventually.equal("http://localhost:4200/books")
});

/**
 * Review Feature
 */

// Given I am at a textbook’s page
Given(/^I am at a textbook’s page$/, async () => {
    await login()
    await browser.get("http://localhost:4200/book/s2grpxrNPaY8Ctg22jb1");

    var EC = protractor.ExpectedConditions
    await browser.wait(EC.urlContains('s2grpxrNPaY8Ctg22jb1'), 5000000000000)
    await exp(browser.getCurrentUrl()).to.eventually.equal("http://localhost:4200/book/s2grpxrNPaY8Ctg22jb1")
});

// When I click the review button
When(/^I click the review button$/, async () => {
    var EC = protractor.ExpectedConditions;
    await browser.wait(EC.elementToBeClickable(element(by.css('button[data-testid="write-review-btn"]'))), 5000);
    await element(by.css('button[data-testid="write-review-btn"]')).click()
    
});

// And type in the review 
Then(/^type in the review$/, async () => {
    var EC = protractor.ExpectedConditions;
    await browser.wait(EC.visibilityOf(element(by.name('text'))), 500000);
    await element(by.css('[name="text"]')).sendKeys("Good read. I found it quite helpful for my course.");
    await element.all(by.css('button[data-testid="rating-btn"]')).get(3).click();
});

// Then my review is posted if I click post
Then(/^my review is posted if I click post$/, async () => {
    await element(by.buttonText('Post')).click();
    var EC = protractor.ExpectedConditions;
    await browser.wait(EC.visibilityOf(element(by.css('.wrapper131'))), 500000);
    const review = await element.all(by.css('.wrapper153')).get(0).getAttribute("innerText");
    exp(review).to.equal("Good read. I found it quite helpful for my course.")
});

/**
 * Service Tests
 */
Given('the system has a book with no reviews', async function () {
    // Remove any existing reviews in the book
    await fetch(
        'http://127.0.0.1:8080/emulator/v1/projects/csc-510-ba9f8/databases/(default)/documents/books/s2grpxrNPaY8Ctg22jb1/reviews',
        {
          method:'DELETE',
        }
      )

    await fetch(
        'http://127.0.0.1:8080/v1/projects/csc-510-ba9f8/databases/(default)/documents/books/s2grpxrNPaY8Ctg22jb1/reviews',
        {
            method:'GET',
        }
    ).then(response => response.json().then(json => exp(json).to.deep.equal({})))
    
});

When('I create a {int} star review from user {string} with the text {string}', async function (stars, name, text) {
    let head = new Headers()
    head.append("Content-Type", "application/json")

    await fetch(
      'http://127.0.0.1:8080/v1/projects/csc-510-ba9f8/databases/(default)/documents/books/s2grpxrNPaY8Ctg22jb1/reviews',
      {
        method:'POST',
        body: JSON.stringify({
            fields: { 
                date: { 
                    timestampValue: "2023-04-17T20:37:24.057Z" 
                    }, 
                likes: {
                    arrayValue: {}
                    }, 
                rating: {
                    integerValue: stars
                    }, 
                reviewer: {
                    stringValue: name
                    }, 
                text: {
                    stringValue: text
                }
            }
        }),
        headers: head
      }
    ).then(response => exp(response.status).to.deep.equal(200))
});

Then(`the system now stores a {int} star review from {string} with the text {string}`, async function (stars, name, text) {
    var rating = new Number(stars).toString()
    await fetch(
        'http://127.0.0.1:8080/v1/projects/csc-510-ba9f8/databases/(default)/documents/books/s2grpxrNPaY8Ctg22jb1/reviews',
        {
            method:'GET',
        }
    ).then(response => response.json().then(json => exp(json.documents[0]).to.deep.contain({
        fields: { 
            date: { 
                timestampValue: "2023-04-17T20:37:24.057Z" 
                }, 
            likes: {
                arrayValue: {}
                }, 
            rating: {
                integerValue: rating
                }, 
            reviewer: {
                stringValue: name
                }, 
            text: {
                stringValue: text
            }
        }
    })))
});

Given('the system has a review on a book', async function () {
    [this.tempPath, this.tempJson] = await fetch(
        'http://127.0.0.1:8080/v1/projects/csc-510-ba9f8/databases/(default)/documents/books/s2grpxrNPaY8Ctg22jb1/reviews',
        {
            method:'GET',
        }
    ).then(function(response) {return response.json().then(function(json) {exp(json.documents.length).to.equal(1); return [(json.documents[0].name), (json.documents[0].fields)]})})
})

When('I like the review as user {string}', async function (user) {
    this.tempJson['likes'] = {arrayValue: { values: [{stringValue: user}]}}
    let head = new Headers()
    head.append("Content-Type", "application/json")

    let url = 'http://127.0.0.1:8080/v1/' + this.tempPath
    await fetch(
      url,
      {
        method:'PATCH',
        body: JSON.stringify({fields : this.tempJson}),
        headers: head
      }
    ).then(response => exp(response.status).to.deep.equal(200))

})

Then(`the system now stores a like by {string} for that review`, async function (user) {
    let url = 'http://127.0.0.1:8080/v1/' + this.tempPath
    await fetch(
      url,
      {
        method:'GET'
      }
    ).then(response => response.json().then(json => exp(json.fields.likes.arrayValue.values).to.deep.contain({stringValue: 'Bob'})))
})

When('I add a comment to the review from {string} with the text {string}', async function (user, text) {
    let head = new Headers()
    head.append("Content-Type", "application/json")

    let url = 'http://127.0.0.1:8080/v1/' + this.tempPath + "/comments"
    this.tempPath = await fetch(
      url,
      {
        method:'Post',
        body: JSON.stringify({
            fields: {
                commenter: {
                    stringValue: user
                },
                date: {
                    timestampValue: "2023-04-17T20:37:24.057Z" 
                },
                text: {
                    stringValue: text
                }
            }
        }),
        headers: head
      }
    ).then(function(response) {exp(response.status).to.deep.equal(200); return response.json().then(function(json) {return json.name})})
})

Then(`the system now stores that comment from {string} for the review with the text {string}`, async function (user, text) {
    let url = 'http://127.0.0.1:8080/v1/' + this.tempPath
    await fetch(
        url,
        {
            method:'GET',
        }
    ).then(response => response.json().then(json => exp(json).to.deep.contain({ 
                                                                                fields: {
                                                                                    commenter: {
                                                                                        stringValue: user
                                                                                    },
                                                                                    date: {
                                                                                        timestampValue: "2023-04-17T20:37:24.057Z" 
                                                                                    },
                                                                                    text: {
                                                                                        stringValue: text
                                                                                    }
                                                                                }
                                                                            })
    ))
    
    // Clear review
    await fetch(
        'http://127.0.0.1:8080/emulator/v1/projects/csc-510-ba9f8/databases/(default)/documents/books/s2grpxrNPaY8Ctg22jb1/reviews',
        {
          method:'DELETE',
        }
    ).then(response => exp(response.status).to.deep.equal(200))
})



Given('the system does not have a book with the name {string}', async function (title) {
    await fetch(
        'http://127.0.0.1:8080/v1/projects/csc-510-ba9f8/databases/(default)/documents/books',
        {
            method:'GET',
        }
    ).then(response => response.json().then(json => json.documents.forEach(document => {
        exp(document.fields).to.not.deep.contain({title: { stringValue: title}})
    })))
})

When('I create a request for the book {string} to be added', async function (title) {
    let head = new Headers()
    head.append("Content-Type", "application/json")

    this.tempPath = await fetch(
      'http://127.0.0.1:8080/v1/projects/csc-510-ba9f8/databases/(default)/documents/books',
      {
        method:'POST',
        body: JSON.stringify({
            fields: { 
                author: { 
                    stringValue: "Test Author" 
                    }, 
                description: {
                    stringValue: "Test Description"
                    }, 
                image: {
                    stringValue: "imageURL"
                    }, 
                requester: {
                    stringValue: "Test User"
                    }, 
                status: {
                    stringValue: "pending"
                },
                tags: {
                    arrayValue: {}
                },
                title: {
                    stringValue: title
                }
            }
        }),
        headers: head
      }
    ).then(function(response) {exp(response.status).to.deep.equal(200); return response.json().then(function(json) { return json.name })})
})

Then(`the system now stores a book with the title {string} and a status of {string}`, async function (title, status) {
    let url = 'http://127.0.0.1:8080/v1/' + this.tempPath
    await fetch(
        url,
        {
            method:'GET',
        }
    ).then(response => response.json().then(json => exp(json).to.deep.contain({
        fields: { 
            author: { 
                stringValue: "Test Author" 
                }, 
            description: {
                stringValue: "Test Description"
                }, 
            image: {
                stringValue: "imageURL"
                }, 
            requester: {
                stringValue: "Test User"
                }, 
            status: {
                stringValue: status
            },
            tags: {
                arrayValue: {}
            },
            title: {
                stringValue: title
            }
        }
    })))

    //Clear book
    url = 'http://127.0.0.1:8080/emulator/v1/' + this.tempPath
    await fetch(
        url,
        {
          method:'DELETE',
        }
    ).then(response => exp(response.status).to.deep.equal(200))
})

Given('the system has a book', async function () {
    this.tempJson = await fetch(
        'http://127.0.0.1:8080/v1/projects/csc-510-ba9f8/databases/(default)/documents/books',
        {
            method:'GET',
        }
    ).then(function(response) { return response.json().then(function(json) {exp(json.documents.length).to.equal(1); return json.documents[0].fields})})
})

When('I add the book to a user\'s reading list', async function () {
    let head = new Headers()
    head.append("Content-Type", "application/json")

    this.tempPath = await fetch(
      'http://127.0.0.1:8080/v1/projects/csc-510-ba9f8/databases/(default)/documents/users/VoypdJSrrlFD7Y16ySMjMQZ4Q4DJ/reading-list',
      {
        method:'POST',
        body: JSON.stringify({fields : this.tempJson}),
        headers: head
      }
    ).then(function(response) {exp(response.status).to.deep.equal(200); return response.json().then(function(json) { return json.name })})
})

Then(`the system now stores the book in the user's reading list`, async function () {
    let url = 'http://127.0.0.1:8080/v1/' + this.tempPath
    await fetch(
        url,
        {
            method:'GET',
        }
    ).then(response => response.json().then(json => exp(json).to.deep.contain({ fields: this.tempJson})))

    //Clear reading-list
    url = 'http://127.0.0.1:8080/emulator/v1/' + this.tempPath
    await fetch(
        url,
        {
          method:'DELETE',
        }
    ).then(response => exp(response.status).to.deep.equal(200))
})



async function login() {
    // log in start
    await browser.get("http://localhost:4200/login");
    const emailInput = element(by.css('input[formControlName="email"]'));
    await emailInput.sendKeys('test@testmail.com');
    const passwordInput = element(by.css('input[formControlName="password"]'));
    await passwordInput.sendKeys('password');
    const loginButton = element(by.buttonText('Login'));
    await loginButton.click();
    // log in end
    var EC = protractor.ExpectedConditions
    await browser.wait(EC.urlContains('books'), 500000)
    await exp(browser.getCurrentUrl()).to.eventually.equal("http://localhost:4200/books")
}

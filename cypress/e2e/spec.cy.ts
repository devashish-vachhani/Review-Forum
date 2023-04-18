describe('e2e tests', () => {
  context('as a user', () => {
    const username = 'test';
    const email = 'test@gmail.com';
    const password = 'test1234';

    before(() => {
      cy.login(email, password);
    });

    after(() => {
      cy.logout();
      cy.clearData();
    })

    describe('New book feature', () => {
      beforeEach(() => {
        cy.visit('/books');
      })
      it('should request a new book', () => {
        const title = "Software Engineering at Google";
        const author = "Winters, Manshreck, Wright";
        const description = "With this book, you'll get a candid and insightful look at how software is constructed and maintained by some of the world's leading practitioners."
        const university = "North Carolina State University";
        const course = "CSC-510";
        const image = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1576579607i/48816586.jpg"
    
        cy.byTestId('new-request-page-btn').click()
        cy.url().should('include', '/books/new');
        cy.get('#title').type(title);
        cy.get('#author').type(author);
        cy.get('#description').type(description);
        cy.get('#university').select(university);
        cy.get('#course').select(course);
        cy.get('#image').type(image);
        cy.byTestId('submit-request-btn').click();
        cy.url().should('include', '/books');
        cy.contains('Thank you for your book request. We will get back to you soon.');
        cy.byTestId('menu-btn').click();
        cy.byTestId('book-requests-page-btn').click();
        cy.contains('td', title)
        .parents('tr')
        .find('td:nth-child(6)')
        .should('contain', 'pending');
      })
    })

    describe('Book tests', () => {
      beforeEach(() => {
        cy.visit('/books');
      })
      context('search by title', () => {
        beforeEach(() => {
          const searchTitle = "code complete";
          cy.searchBy('Title', searchTitle);
          cy.byTestId('card-title').each(($title) => {
            expect($title.text().toLowerCase()).to.include(searchTitle.toLowerCase());
          })
          // Click "View" button on first book card
          cy.byTestId('card').first().within(() => {
            cy.byTestId('view-btn').click();
          });
          // Assert that the URL includes the book ID
          cy.url().should('match', /\/book\/\w+$/);
        })
        describe('Reading list feature', () => {
          it('should add a book to reading list', () => {
            cy.byTestId('add-btn').click();
            cy.byTestId('book-title')
              .invoke('text')
              .then(title => {
                cy.byTestId('menu-btn').click();
                cy.byTestId('reading-list-page-btn').click();
          
                cy.byTestId('book-title').should('contain', title);
              });
          })
        })
        describe('Review feature', () => {
          const rating = 4;
          const reviewText = 'This is a test review';
          it('should review a book', () => {
            cy.byTestId('write-review-btn').click();
            // select 4 stars
            cy.byTestId('rating-btn').eq(rating-1).click();
            // enter review text
            cy.get('textarea[name="text"]').type(reviewText);
            // click the "Post" button
            cy.byTestId('post-btn').click();
            cy.byTestId('review-container').contains(username).should('exist');
          })
        })
        describe('Comment feature', () => {
          it('should comment on a review', () => {
            cy.contains('[data-testid="review-container"]', 'dummy')
              .within(() => {
                cy.byTestId('toggle-comments-btn').click();
                cy.get('#text').type('this is a test comment') // type the comment
                cy.byTestId('post-btn').click() // click the post button
                cy.byTestId('comment-container').contains(username).should('exist');
              });
          })
        })
      })
      context('search by university', () => {
        beforeEach(() => {
          const searchUniversity = "North Carolina State University";
          const searchCode = "NCSU";
    
          cy.searchBy('University', searchUniversity);
    
          cy.get('.content').within(() => {
            cy.byTestId('card').each(($book) => {
              cy.wrap($book).find('.tags-button').trigger('mouseenter');
              cy.get('.popover-content').should('be.visible').and('contain', searchCode);
              cy.wrap($book).find('.tags-button').trigger('mouseleave');
            })
          })
    
          // Click "View" button on first book card
          cy.byTestId('card').first().within(() => {
            cy.byTestId('view-btn').click();
          });
          // Assert that the URL includes the book ID
          cy.url().should('match', /\/book\/\w+$/);
        })
        // add more tests if needed
      })
    })
  })
})
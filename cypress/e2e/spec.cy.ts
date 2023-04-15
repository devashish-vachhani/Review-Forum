describe('e2e tests', () => {
  beforeEach(() => {
    cy.login('test@gmail.com', 'test1234');
  });

  afterEach(() => {
    cy.logout();
  })

  describe('request a new book', () => {
    it('should be successful', () => {
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

  // describe('search for a book', () => {

  //   it.only('should search by title', () => {
  //     const searchTitle = "code complete";
  //     cy.searchBy('Title', searchTitle);
  //     cy.byTestId('card-title').each(($title) => {
  //       expect($title.text().toLowerCase()).to.include(searchTitle.toLowerCase());
  //     })
  //   })

  //   it.only('should search by university', () => {
  //     const searchUniversity = "North Carolina State University";
  //     const searchCode = "NCSU";

  //     cy.searchBy('University', searchUniversity);

  //     cy.get('.content').within(() => {
  //       cy.byTestId('card').each(($book) => {
  //         cy.wrap($book).find('.tags-button').trigger('mouseenter');
  //         cy.get('.popover-content').should('be.visible').and('contain', searchCode);
  //         cy.wrap($book).find('.tags-button').trigger('mouseleave');
  //       })
  //     })
  //   })
  // })

  describe('write a review for a book', () => {
    it('should search a book by title', () => {
      const searchTitle = "code complete";
      const rating = 4;
      const reviewText = "This is a test review";

      cy.searchBy('Title', searchTitle);
      cy.byTestId('card-title').each(($title) => {
        expect($title.text().toLowerCase()).to.include(searchTitle.toLowerCase());
      })
      // Click "View" button on first book card
      cy.byTestId('card').first().within(() => {
        cy.byTestId('view-btn').click();
      });
      // Assert that the URL includes the book ID
      cy.url().should('match', /\/book\/\d+$/);
      cy.byTestId('write-review-btn').click();
      // select 4 stars
      cy.byTestId('rating-btn').eq(rating-1).click();
      // enter review text
      cy.get('textarea[name="text"]').type(reviewText);
      // click the "Post" button
      cy.byTestId('post-btn').click();
    })
  })
})

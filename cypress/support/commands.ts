declare namespace Cypress {
    interface Chainable {
      /**
       * Get one or more DOM elements by test id.
       *
       * @param id The test id
       * @param options The same options as cy.get
       */

      byTestId<E extends Node = HTMLElement>(
        id: string,
        options?: Partial<
          Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow
        >,
      ): Cypress.Chainable<JQuery<E>>;
      
      login(email: string, password: string): void;
      logout(): void;
      searchBy(searchMode: string, searchTerm: string): void;
    }
}

  Cypress.Commands.add('byTestId',
    // Borrow the signature from cy.get
    <E extends Node = HTMLElement>(
      id: string,
      options?: Partial<
        Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow
      >,
    ): Cypress.Chainable<JQuery<E>> => cy.get(`[data-testid="${id}"]`, options),
  );

  Cypress.Commands.add('login', (email, password) => {
    cy.visit('/')
    cy.byTestId('menu-btn').click();
    cy.byTestId('login-page-btn').click();
    cy.url().should('include', '/login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.byTestId('login-btn').click();
    cy.url().should('include', '/books');
  })

  Cypress.Commands.add('logout', () => {
    cy.byTestId('menu-btn').click();
    cy.byTestId('logout-page-btn').click();
  })

  Cypress.Commands.add('searchBy', (searchMode, searchTerm) => {
    cy.byTestId('search-mode').click({force: true}).get('mat-option').contains(searchMode).click();
    if(searchMode === 'Title') {
      cy.byTestId('search-title').type(searchTerm);
    } else {
      cy.byTestId('search-university').click().get('mat-option').contains(searchTerm).click();
    }
    cy.byTestId('search-btn').click();
  })
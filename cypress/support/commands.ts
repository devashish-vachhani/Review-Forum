import { collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp} from 'firebase/app';
import { environment } from 'src/environments/environment.testing';

declare global {
  namespace Cypress {
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
      clearData(): void;
    }
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

  Cypress.Commands.add('clearData', async () => {
    await deleteCollection("books/imF9qNeAJ6EZ7i82epbM/reviews/Y4U4lpqRVUtp4mawVmSF/comments")
    await deleteCollection("books/imF9qNeAJ6EZ7i82epbM/reviews", ["Y4U4lpqRVUtp4mawVmSF"])
    await deleteCollection("books", ["imF9qNeAJ6EZ7i82epbM"])
    await deleteCollection("users/tlMl9ZWNOZacOvtUhkt8Hq69Wkk1/reading-list")
    await deleteCollection("books", ["imF9qNeAJ6EZ7i82epbM"])
  });

async function deleteCollection(path: string, exclude?: string[]) {
  initializeApp(environment.firebaseConfig)
    let db = getFirestore()
    const querySnapshot = await getDocs(collection(db, path));
    querySnapshot.forEach(async (document) => {
      if(exclude == undefined || exclude.indexOf(document.id) == -1) {
        const documentRef = doc(db, path, document.id);
        await deleteDoc(documentRef);
      }
    });
}

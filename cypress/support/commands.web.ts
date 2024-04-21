/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add("visitSite", () => {
  cy.visit(`http://localhost:5173/`);
  cy.get('input[placeholder="Procurar por remédio"]');
});

Cypress.Commands.add("medicineByName", () => {
  cy.visit(`http://localhost:5173/`);
  cy.get('input[placeholder="Procurar por remédio"]');
  cy.get("select").select("name");
  cy.get('input[placeholder="Procurar por remédio"]').type("ALPRAZOLAM");
  cy.get(".h-min-screen").contains("ALPRAZOLAM");
});

Cypress.Commands.add("medicineByCompany", () => {
  cy.visit(`http://localhost:5173/`);
  cy.get('input[placeholder="Procurar por remédio"]');
  cy.get("select").select("company");
  cy.get('input[placeholder="Procurar por empresa"]').type("EMS S/A");
  cy.get(".h-min-screen").contains("EMS S/A");
});

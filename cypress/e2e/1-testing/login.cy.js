/// <reference types="cypress" />
describe("Synapse social testing", () => {
  beforeEach(() => {
    cy.visit("https://main--teamzeusjs2.netlify.app/");
  });

  it("can login", () => {
    const email = "fjono@stud.noroff.no";
    const password = "fjonoerbono";
    cy.get(".email").type(`${email}`);
    cy.get(".password").type(`${password}{enter}`);
    cy.get("h3").should("have.text", "fjono");
  });

  it("cannot submit the login form with invalid credentials and is shown a message", () => {
    const email = "fjonot@stud.noroff.no";
    const password = "fjonoterbono";
    cy.get(".email").type(`${email}`);
    cy.get(".password").type(`${password}{enter}`);
    cy.get(".error").should("have.class", "error");
  });

  it("can log out", () => {
    const email = "fjono@stud.noroff.no";
    const password = "fjonoerbono";
    cy.get(".email").type(`${email}`);
    cy.get(".password").type(`${password}{enter}`);
    cy.get("h3").should("have.text", "fjono");
    cy.get(".menubutton").click();
    cy.get(".logout").click();
    cy.contains("Login").should("exist");
  });
});

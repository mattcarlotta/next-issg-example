context("Home Page", () => {
  before(() => {
    cy.exec("npm run seed:prod");
    cy.reload();
  });

  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-testid=create-user]").click();
  });

  it("displays a create user form", () => {
    cy.url().should("contain", "/users/create");

    cy.get("[data-testid=form-title]").should("have.text", "Create User Form");
    cy.get("[data-testid=user-form]").should("have.length", 1);
  });

  it("cancels creating a user", () => {
    cy.get("[data-testid=cancel]").click();

    cy.get("[data-testid=user-form]").should("have.length", 0);

    cy.url().should("contain", "/");
  });

  it("displays errors when attempting to submit a form with empty fields", () => {
    cy.get("[data-testid=submit]").click();

    cy.get("[data-testid=errors]").should("have.length", 9);
  });

  it("displays an error if trying to create a user that already exists", () => {
    [
      "userName",
      "email",
      "firstName",
      "lastName",
      "street",
      "suite",
      "city",
      "state",
      "zipCode",
      "backgroundInfo",
    ].forEach(name => {
      let value = "123@email.com";
      if (name === "userName") value = "chopsuey";
      cy.get(`[data-testid=${name}]`).type(value);
    });
    cy.get("[data-testid=submit]").click();

    cy.get("[data-testid=modal-message]")
      .should("have.length", 1)
      .and("have.text", "That username is already in use!");
  });

  it("creates a new user", () => {
    [
      "userName",
      "email",
      "firstName",
      "lastName",
      "street",
      "suite",
      "city",
      "state",
      "zipCode",
      "backgroundInfo",
    ].forEach(name => {
      cy.get(`[data-testid=${name}]`).type("123@email.com");
    });
    cy.get("[data-testid=submit]").click();

    cy.get("[data-testid=modal-message]")
      .should("have.length", 1)
      .and("have.text", "Successfully created 123@email.com.");
  });
});

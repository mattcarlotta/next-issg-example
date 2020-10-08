const selectCardOption = (option: string): void => {
  cy.get("[data-testid=dropdown-container]").click();
  cy.get("[data-testid=dropdown-menu]").within(() => {
    cy.get(`[data-testid='${option}']`).click();
  });
};

context("Users Page", () => {
  before(() => {
    cy.exec("npm run seed:prod");
    cy.visit("/");
    cy.reload();
  });

  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-testid=link").first().click();
  });

  it("displays the a users profile when data is present", () => {
    cy.get("[data-testid=card-container]").should("have.length", 1);
  });

  it("displays an edit form", () => {
    selectCardOption("edit");

    cy.url().should("contain", "/users/edit");

    cy.get("[data-testid=form-title]").should("have.text", "Edit User Form");
  });

  it("renders errors if a required input is empty", () => {
    selectCardOption("edit");

    cy.get("input[data-testid=userName]").clear();

    cy.get("[data-testid=submit]").click();

    cy.get("[data-testid=errors]").should("have.length", 1);
  });

  it("displays an error if an edited username matches a pre-existing username", () => {
    selectCardOption("edit");

    cy.get("input[data-testid=userName]").clear().type("notjohnsson");

    cy.get("[data-testid=submit]").click();

    cy.get("[data-testid=modal-message]")
      .should("have.length", 1)
      .and("have.text", "That username is already in use!");
  });

  it("cancels updating the user", () => {
    selectCardOption("edit");

    cy.get("[data-testid=cancel]").click();

    cy.get("[data-testid=user-form").should("have.length", 0);

    cy.get("[data-testid=card-container]").should("have.length", 1);
  });

  it("updates a user", () => {
    selectCardOption("edit");

    cy.get("input[data-testid=userName]").clear().type("snapplecracklepop");

    cy.get("[data-testid=submit]").click();

    cy.get("[data-testid=modal-message]")
      .should("have.length", 1)
      .and("have.text", "Successfully updated snapplecracklepop.");
  });

  it("when the 'Go Back' link is pressed, it navigates to home", () => {
    cy.get("[data-testid=link]").click();

    cy.url().should("contain", "/");

    cy.get("[data-testid=home-page]").should("have.length", 1);
  });

  it("deletes a user", () => {
    selectCardOption("delete");

    cy.get("[data-testid=modal-message]")
      .should("have.length", 1)
      .and("have.text", "Successfully deleted snapplecracklepop.");
  });
});

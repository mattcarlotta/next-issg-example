context("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("initially displays user cards", () => {
    cy.get("[data-testid=home-page]").should("have.length", 1);
    cy.get("[data-testid=card-container]").its("length").should("be.gt", 0);
  });

  // it("seeds the database", () => {
  //   cy.get("[data-testid=seed-database]").click();

  //   cy.get("[data-testid=card-container]").should("have.length", 3);
  // });

  it("navigates to the create user page", () => {
    cy.get("[data-testid=create-user]").click();

    cy.url().should("contain", "/users/create");
  });

  it("navigates to a user's profile", () => {
    cy.get("[data-testid=link").first().click();

    cy.url().should("contain", "/users");

    cy.get("[data-testid=card-container]").should("have.length", 1);
  });

  // it("drops the database", () => {
  //   cy.get("[data-testid=drop-database]").click();

  //   cy.get("[data-testid=card-container]").should("have.length", 0);
  // });
});

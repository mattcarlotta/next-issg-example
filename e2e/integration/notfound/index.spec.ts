context("Not Found Page", () => {
  beforeEach(() => {
    cy.visit("/notfound", { failOnStatusCode: false });
  });

  it("initially displays not found page", () => {
    cy.get("[data-testid=not-found-page]").should("have.length", 1);

    cy.get("[data-testid=link]")
      .should("have.length", 1)
      .and("have.attr", "href", "/");
  });

  it("allows a user to navigate to the home page", () => {
    cy.get("[data-testid=link]").click();

    cy.url().should("contain", "/");

    cy.get("[data-testid=home-page]").should("have.length", 1);
  });
});

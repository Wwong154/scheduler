describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
});

describe("Navigation", () => {
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("li", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});

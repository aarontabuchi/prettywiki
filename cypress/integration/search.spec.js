/// <reference types="cypress" />

describe(
  'Mobile specs',
  {
    viewportHeight: 823,
    viewportWidth: 411,
  },
  () => {
    it('Input is not auto-focused', () => {
      cy.visit("/");
      cy.get("#search").toMatchImageSnapshot();
    })

    it('Clicking on input goes fullscreen / hides logo', () => {
      cy.get('#searchInput').click();
      cy.get('img').should("not.be.visible");
    })
  }
)

context("Search functions", () => {
  it("Input is auto focused", () => {
    cy.visit("/");
    cy.focused().should("have.attr", "type", "text");
  });

  it("Search does not have box shadow", () => {
    cy.get("#search").toMatchImageSnapshot();
  });

  // it("Input has box shadow when hovered", () => {
  //   add in when Cypress resolves https://github.com/cypress-io/cypress/issues/10
  // });

  it("Displays search results on input", () => {
    cy.get("#search").type("co");
    cy.get("#searchResults");
  });

  it("Search has box shadow with search results", () => {
    cy.get("#search").toMatchImageSnapshot();
  });

  it("User input text-casing is preserved", () => {
    cy.get("#searchInput").type("M");
    cy.get("#searchInput").should("have.attr", "value", "coM");
    cy.get("#search").contains("coMputer");
  });

  it("Search results are bold and have magnifying glass icon", () => {
    // search results have id's 1-10
    cy.get("#2").toMatchImageSnapshot();
  });

  it("Escape key hides search results", () => {
    cy.focused().type("{esc}");
    cy.get("#searchResults").should("not.be.visible");
  });

  it("Clear button appears after input and button deletes input", () => {
    cy.get("#clearSearch").click();
    cy.get("#searchInput").should("have.attr", "value", "");
  });

  it("Clear icon is removed when input is empty", () => {
    cy.get("#clearSearch").should("not.be.visible");
  });

  it("Arrow keys should not cause empty search results to show", () => {
    cy.get("#search")
      .click()
      .type("{downarrow}");
    cy.get("#searchResults").should("not.be.visible");
    cy.get("#search").type("{uparrow}");
    cy.get("#searchResults").should("not.be.visible");
  });

  it("Left/right arrow keys should not cause search results to show", () => {
    cy.get("#searchInput")
      .as("searchInput")
      .type("comu{esc}");
    cy.get("@searchInput").type("{leftarrow}");
    cy.get("#searchResults")
      .as("searchResults")
      .should("not.be.visible");
    cy.focused().type("p{rightarrow}");
    cy.get("@searchResults").contains("program");
  });

  it("Clicking outside of search should hide search results", () => {
    cy.get("img").click();
    cy.get("#searchResults").should("not.be.visible");
  });

  it("Clicking in search input should show search results", () => {
    cy.get("#searchInput").click();
    cy.get("#searchResults").should("be.visible");
  });

  it("Mouseover changes selection highlight", () => {
    cy.get("#1")
      .parent()
      .trigger("mousemove", { clientY: 2 });
    cy.get("#search").toMatchImageSnapshot();
  });

  it("Up/down arrow key changes selection from where mouseover is", () => {
    cy.get("#searchInput").type("{downarrow}");
    cy.get("#searchInput").should("have.attr", "value", "computer");
  });

  it("Up/down arrow key should display search results (if closed by escape) without moving selection", () => {
    cy.get("#searchInput").type("{esc}");
    cy.get("#searchResults").should("not.be.visible");
    cy.get("#search").type("{uparrow}");
    cy.get("#searchResults").should("be.visible");
    cy.get("#searchInput").should("have.attr", "value", "compu");
    cy.get("#searchInput").type("{esc}");
    cy.get("#search").type("{downarrow}");
    cy.get("#searchResults").should("be.visible");
    cy.get("#searchInput").should("have.attr", "value", "compu");
  });

  it("Up/down arrow key should change search result selection and update search input to match selection without moving cursor", () => {
    cy.get("#searchInput").type("{downarrow}{downarrow}{downarrow}");
    cy.get("#searchInput").should("have.attr", "value", "computer science");
    cy.get("#searchInput").type("{uparrow}");
    cy.get("#searchInput").should("have.attr", "value", "computer");
    cy.get("#searchInput").type(" ");
    cy.get("#searchResults").contains("science");
  });

  it("Go to article by hitting enter", () => {
    cy.get("#searchInput").type("{enter}");
    cy.contains("web browser");
  });

  it("Go to article by clicking on search result", () => {
    cy.visit("/");
    cy.focused().type("compu");
    cy.get("#1")
      .parent()
      .click();
  });
});

/* 
Tests (functional and visual)
F Auto focus on input on page load
V Input does not have box shadow
V - box shadow on hover
F Display search results on typing
V box shadow when search results are present
V Show "X" clear-input button after typing
V Typed capitalization is preserved
V search result suggestions are bold
V search results have magnifying glass
F click on X clear button clears input
V - Clicking outside of search hides the search results
F Arrow key search result navigation updates input value
F ArrowUp does not move cursor
  V changes highlight
  F changes input value
F ESC key hides search results and removes auto-completed text
  F clicking in input will redisplay the search results
  F hitting the arrowUP/down key will redisplay the search results
  F ArrowLeft/Right move text cursor without affecting search results

V highlight on search result hover
  V mouse hover overrides the arrowkey hover so that there is only 1 highlight at a time
  V using arrowUp/Down will continue from where mouse cursor was

F Click on search result to go to article
F Use Enter to go to article

Mobile
*/

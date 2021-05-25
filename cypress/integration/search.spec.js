/// <reference types="cypress" />

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
    cy.get("#search").type("go");
    cy.get("#searchResults");
  });

  it("Search has box shadow with search results", () => {
    cy.get("#search").toMatchImageSnapshot();
  });

  it("User input text-casing is preserved", () => {
    cy.get("#searchInput").type("O");
    cy.get("#searchInput").should("have.attr", "value", "goO");
    cy.get("#search").contains("goOgle");
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
      .type("gog{esc}");
    cy.get("@searchInput").type("{leftarrow}");
    cy.get("#searchResults")
      .as("searchResults")
      .should("not.be.visible");
    cy.focused().type("o{rightarrow}");
    cy.get("@searchResults").contains("Chrome");
  });
});

// describe(
//   'Mobile specs are working',
//   {
//     viewportHeight: 1000,
//     viewportWidth: 400,
//   },
//   () => {
//     it('does not display sidebar', () => {
//       cy.get('#sidebar').should('not.be.visible')
//     })

//     it('shows hamburger menu', () => {
//       cy.get('#header').find('i.menu').should('be.visible')
//     })
//   }
// )

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
V highlight on search result hover
  V mouse hover overrides the arrowkey hover so that there is only 1 highlight at a time
  V using arrowUp/Down will continue from where mouse cursor was

F ESC key hides search results and removes auto-completed text
  F clicking in input will redisplay the search results
  F hitting the arrowUP/down key will redisplay the search results
  F ArrowLeft/Right move text cursor without affecting search results
  
F Click on search result to go to article
F Use Enter to go to article

Mobile
*/

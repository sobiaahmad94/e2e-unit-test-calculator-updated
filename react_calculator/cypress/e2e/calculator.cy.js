describe("Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  })

  it('should have working number buttons', () => {
    cy.get('#number2').click();
    cy.get('.display').should('contain', '2')
  })
})

///////// e2e TESTING USING CYPRESS:

  // e2e tests I wanna do:
  // 1) Do the number buttons update the display of the running total? [doneee]
  // 2) Do the arithmetical operations update the display with the result of the operation? [doneeee]
  // E.g. does 2 + 2 - update the display to 4
  // 3) Can multiple operations be chained together? [done]
  // E.g. does 3 + 1 - 2 == 2
  // 4) Is the output as expected for positive numbers [done]
  // 5) Is the output as expected for negative numbers [omg so similar to the previous one haha] [done]
  // 6) Is the output as expected for decimal numbers [done]
  // 7) Is the output as expected for very large numbers [doneeee]
  // 8) What does the code do in exceptional circumstances? Specifically, if you divide by zero, what is the effect? Write a test to describe what you'd prefer to happen, and then correct the code to make that test pass (you will need to modify the Calculator model to meet this requirement).

  // SOME NOTES:
  // cy.get is like grabbing an element I think (similar to querySelector)
  // instead of number1, number2 etc as the ids like in unit testing
  // have to grab the full thing like data-testid="number1"
  // .click can be used as a click event similar to before
  // .should is the equivalent to expected
  // have.text is mentioned here in the cypress documentation: example was this - .should('have.text', 'I love testing')


  // 1) Do the number buttons update the display of the running total?
  it('Should update the display of the running total', () => {
  
    // click events on the numbers
    cy.get('[data-testid="number1"]').click();
    cy.get('[data-testid="number7"]').click();
    cy.get('[data-testid="number2"]').click();
    cy.get('[data-testid="number4"]').click();
    cy.get('[data-testid="number3"]').click();
    cy.get('[data-testid="number0"]').click();
    cy.get('[data-testid="number8"]').click();

    // should is basically like expected I think 
    // have.text needs to be used
    cy.get('[data-testid="running-total"]').should('have.text', '1724308');
  });

    // 2) Do the arithmetical operations update the display with the result of the operation?
    // should be something like 3 - 2 
    it('Should update the display when clicking arithmetical operations when entering sums', () => {
  
      // click events on the button ids on the calc
      cy.get('[data-testid="number3"]').click();
      cy.get('[data-testid="operator-subtract"]').click();
      cy.get('[data-testid="number1"]').click();
      cy.get('[data-testid="equals-operator"]').click();
      
      // should = expected
      // have.text again:)
      cy.get('[data-testid="running-total"]').should('have.text', '2');
    });

      // 3) Can multiple operations be chained together?
      // could be something like 4 + 1 - 2 == 3

      it('Should be able to let you chain multiple arithmetic operators together', () => {
  
        // click events on the button ids on the calc
        cy.get('[data-testid="number4"]').click();
        cy.get('[data-testid="operator-add"]').click();
        cy.get('[data-testid="number1"]').click();
        cy.get('[data-testid="operator-subtract"]').click();
        cy.get('[data-testid="number2"]').click();
        cy.get('[data-testid="equals-operator"]').click();


        // should = expected
        // have.text again:)
        cy.get('[data-testid="running-total"]').should('have.text', '3');
      });

        // 4) Is the output as expected for positive numbers?
        // 8 + 9 + 3 + 1 + 7 = 28 (positive number result)
        it('Should output positive numbers when the total is a positive number when there is a sum calculated', () => {
          cy.get('[data-testid="number8"]').click();
          cy.get('[data-testid="operator-add"]').click();
          cy.get('[data-testid="number9"]').click();
          cy.get('[data-testid="operator-add"]').click();
          cy.get('[data-testid="number3"]').click();
          cy.get('[data-testid="operator-add"]').click();
          cy.get('[data-testid="number1"]').click();
          cy.get('[data-testid="operator-add"]').click();
          cy.get('[data-testid="number7"]').click();
          cy.get('[data-testid="equals-operator"]').click();


          // should = expected
          // have.text
          cy.get('[data-testid="running-total"]').should('have.text', '28');
        });

        // 5) Is the output as expected for negative numbers
        // 1003 - 3031 (negative number result)
        it('Should output negative numbers when the total is a positive number when there is a sum calculated', () => {
          cy.get('[data-testid="number1"]').click();
          cy.get('[data-testid="number0"]').click();
          cy.get('[data-testid="number0"]').click();
          cy.get('[data-testid="number3"]').click();
          cy.get('[data-testid="operator-subtract"]').click();
          cy.get('[data-testid="number3"]').click();
          cy.get('[data-testid="number0"]').click();
          cy.get('[data-testid="number3"]').click();
          cy.get('[data-testid="number1"]').click();
          cy.get('[data-testid="equals-operator"]').click();

          // should = expected
          // have.text
          cy.get('[data-testid="running-total"]').should('have.text', '-2028');
        });

          // 6) Is the output as expected for decimal numbers
          // could do 5.7 + 9.6 = 15.3
          it('Should output decimal/floating point numbers', () => {
            cy.get('[data-testid="number5"]').click();
            cy.get('[data-testid="decimal"]').click();
            cy.get('[data-testid="number7"]').click();
            cy.get('[data-testid="operator-add"]').click();
            cy.get('[data-testid="number9"]').click();
            cy.get('[data-testid="decimal"]').click();
            cy.get('[data-testid="number6"]').click();
            cy.get('[data-testid="equals-operator"]').click();

            // should = expected
          // have.text
          cy.get('[data-testid="running-total"]').should('have.text', '15.3');

          });

          // 7) Is the output as expected for very large numbers
          // here's a large number 1399011987235725
          it('Should be able to output very large numbers', () => {
            cy.get('[data-testid="number1"]').click();
            cy.get('[data-testid="number3"]').click();
            cy.get('[data-testid="number9"]').click();
            cy.get('[data-testid="number9"]').click();
            cy.get('[data-testid="number0"]').click();
            cy.get('[data-testid="number1"]').click();
            cy.get('[data-testid="number1"]').click();
            cy.get('[data-testid="number9"]').click();
            cy.get('[data-testid="number8"]').click();
            cy.get('[data-testid="number7"]').click();
            cy.get('[data-testid="number2"]').click();
            cy.get('[data-testid="number3"]').click();
            cy.get('[data-testid="number5"]').click();
            cy.get('[data-testid="number7"]').click();
            cy.get('[data-testid="number2"]').click();
            cy.get('[data-testid="number5"]').click();
            cy.get('[data-testid="equals-operator"]').click();

            // should = expected
            // have.text
            cy.get('[data-testid="running-total"]').should('have.text', '1399011987235725');

          });

            // 8) What does the code do in exceptional circumstances? Specifically, if you divide by zero, what is the effect? Write a test to describe what you'd prefer to happen, and then correct the code to make that test pass (you will need to modify the Calculator model to meet this requirement).
            // I'll write the test but will change the Calculator component later
            // 4 / 0 is a basic one
          it('Should be able to divide by 0 so that the user can get the full calculator experience haha', () => {
            cy.get('[data-testid="number4"]').click();
            cy.get('[data-testid="operator-divide"]').click();
            cy.get('[data-testid="number0"]').click();
            cy.get('[data-testid="equals-operator"]').click();

            // should = expected
            // have.text
            cy.get('[data-testid="running-total"]').should('have.text', `Soz pal, you can't divide by 0 right now. What a class calaculator, eh? ;) Hopefully will get that sorted for you soon...`);

          });
          











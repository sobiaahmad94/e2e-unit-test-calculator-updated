describe('Comment', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })


    xit('Should have pre-populated comments', () => {
        const commentListItems = cy.get('#comment-list > li')
        commentListItems.should('have.length', 2)
    });

    xit('should be able to add a comment', () => {
        cy.get('#name-input').type("John Jackson");
        cy.get('#comment-input').type("This is a test");
        cy.get('#comment-form').submit();  // ADDED
        const commentListItems = cy.get('#comment-list > li'); // ADDED
        commentListItems.should('have.length', 3); // ADDED
    });

})
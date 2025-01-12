describe('Example Cypress Test', () => {
    it('should visit the example page and check the title', () => {
        cy.visit('https://example.cypress.io')
        cy.title().should('include', 'Cypress')
    })

    it('should find and click the type button', () => {
        cy.visit('https://example.cypress.io')
        cy.contains('type').click()
        cy.url().should('include', '/commands/actions')
    })

    it('should type into an input field and verify the value', () => {
        cy.visit('https://example.cypress.io/commands/actions')
        cy.get('.action-email')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com')
    })
})
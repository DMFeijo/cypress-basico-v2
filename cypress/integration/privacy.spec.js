Cypress._.times(6,function(){
    it('testa a página da política de privacidade de forma independente', () => {

        cy.visit('./src/privacy.html')
        cy.contains('Política de privacidade').should('be.visible')
        
    });
})
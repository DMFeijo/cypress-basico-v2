/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {

        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function () {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', () => {
        const textolongo = 'testes automatizados com cypress, testes automatizados com cypress, testes automatizados com cypress, testes automatizados com cypress'

        cy.clock()

        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Moura Feijo')
        cy.get('#email').type('email@teste.com')
        cy.get('#open-text-area').type(textolongo, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

        cy.tick(3500)

        cy.get('.success').should('not.be.visible')

    });
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

        cy.clock()

        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Moura Feijo')
        cy.get('#email').type('email.teste.com')
        cy.get('#open-text-area').type('testes automatizados com cypress')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(3500)

        cy.get('.error').should('not.be.visible')

    });
    it('Campo telefone continua vazio quando preenchido com volor não-numérico', () => {

        cy.get('#phone')
            .type('abcdefghijl')
            .should('have.value', '')

    });
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

        cy.clock()

        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Moura Feijo')
        cy.get('#email').type('email@teste.com')
        cy.get('#open-text-area').type('testes automatizados com cypress')
        cy.get('button[type="submit"]').click()
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

        cy.tick(3500)

        cy.get('.error').should('not.be.visible')

    });
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

        cy.get('#firstName')
            .type('Daniel')
            .should('have.value', 'Daniel')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Moura Feijo')
            .should('have.value', 'Moura Feijo')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('email@teste.com')
            .should('have.value', 'email@teste.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('21985632741')
            .should('have.value', '21985632741')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('testes automatizados com cypress')
            .should('have.value', 'testes automatizados com cypress')
            .clear()
            .should('have.value', '')

    });
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

        cy.clock()

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        cy.tick(3500)

        cy.get('.error').should('not.be.visible')

    });
    it('envia o formuário com sucesso usando um comando customizado', () => {

        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(3500)

        cy.get('.success').should('not.be.visible')

    });
    it('seleciona um produto (YouTube) por seu texto', () => {

        cy.get('#product').select('YouTube')// Seleção pelo texto
            .should('have.value', 'youtube')
    });
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {

        cy.get('#product').select('mentoria')// Seleção pelo value 
            .should('have.value', 'mentoria')
    });
    it('seleciona um produto (Blog) por seu índice', () => {

        cy.get('#product').select(1)// Seleção pelo índice
            .should('have.value', 'blog')
    });
    it('marca o tipo de atendimento "Feedback"', () => {

        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')

    });
    it('marca cada tipo de atendimento', () => {

        cy.get('input[type="radio"]')
            .check()
            .should('be.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    });
    it('marca ambos checkboxes, depois desmarca o último', () => {

        cy.get('input[type="checkbox"]') //cy.get onde pegamos todos os inputs
            .check()                     //comando check onde podemos marcar mais de uma opção
            .should('be.checked')        //Verificar se as opções estão marcadas     
            .last()                      //comando last onde seleciona a ultima opção marcada
            .uncheck()                   //comando uncheck usado para desmarcar chekbox e radio
            .should('not.be.checked')    //verificar se a opção esta desmarcada
    });

    it('seleciona um arquivo da pasta fixtures', () => {

        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal("example.json")
            })
    });
    it('seleciona um arquivo simulando um drag-and-drop', () => {

        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal("example.json")
            })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {

        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal("example.json")
            })

    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {

        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {

        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Política de privacidade').should('be.visible')
    });

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    });

    it('faz uma requisição HTTP', () => {
        
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function (response) {
            const{status, statusText, body} = response
            console.log(response)
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
    });

})


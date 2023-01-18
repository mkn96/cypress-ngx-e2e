/// <reference types="cypress" />

describe('First suit', () => {
    it('first test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

    
        // by tag name
        cy.get('input')
        // by id
        cy.get('#inputEmail')
        // by class name
        cy.get('.input-full-width')
        // by attribute name
        cy.get('[placeholder="Email"]')
        // by attribute value
        cy.get('[placeholder="Email"]')
        // by css selector
        cy.get('.input-full-width')
        // by xpath
        cy.get('input[placeholder="Email"]')
        // by link text
        cy.get('a[href="#"]')
    })

    it('second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]').click()
        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')

        cy
        .get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain', 'Sign in')
        .parents('form')
        .find('nb-checkbox')
        .click()

        cy
        .contains('nb-card', 'Horizontal form')
        .find('[type="email"]')
        .type('mike@mail.com')

    })

    it('then and wrap methods', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
    /*
        cy
        .contains('nb-card', 'Using the Grid')
        .find('[for="inputEmail1"]')
        .should('contain', 'Email')
        cy
        .contains('nb-card', 'Using the Grid')
        .find('[for="inputPassword2"]')
        .should('contain', 'Password')
        cy
        .contains('nb-card', 'Basic form')
        .find('[for="exampleInputEmail1"]')
        .should('contain', 'Email')
        cy
        .contains('nb-card', 'Basic form')
        .find('[for="exampleInputPassword1"]')
        .should('contain', 'Password') 

    
    */

    cy.contains('nb-card', 'Using the Grid').then(firstForm => { // .then - jquery method selector
        const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
        const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
        expect(emailLabelFirst).to.equal('Email') // chai assertion
        expect(passwordLabelFirst).to.equal('Password')
    
    cy.contains('nb-card', 'Basic form').then( secondForm => { 
        const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
        expect(passwordLabelSecond).to.equal(passwordLabelFirst)

        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password') // cypress jquery format
 
    })
    })
    })
    it('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy
        .get('[for="exampleInputEmail1"]')
        .should('contain', 'Email address')

        //2 jquery invoke method
        cy
        .get('[for="exampleInputEmail1"]')
        .then( label => {
            expect(label.text()).to.equal('Email address')
        })

        //3 cypress invoke method
        cy
        .get('[for="exampleInputEmail1"]')
        .invoke('text')
        .then( text => {
            expect(text).to.equal('Email address')
        })

        cy
        .contains('nb-card', 'Basic form')
        .find('nb-checkbox')
        .click()
        .find('.custom-checkbox')
        .invoke('attr', 'class')
        //.should('contain', 'checked')
        .then(classValue => {
            expect(classValue).to.contain('checked')
        })
    })

    it('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy
        .contains('nb-card', 'Common Datepicker')
        .find('input')
        .then( input => {
            cy.wrap(input).click()
            cy
            .get('nb-calendar-day-picker')
            .contains('15')
            .click()
            cy.wrap(input).invoke('prop', 'value')
            .should('contain', 'Jan 15, 2023')

        })
    })

    it('radio buttons', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy
        .contains('nb-card', 'Using the Grid')
        .find('[type="radio"]')
        .then( radioButton => {
            cy.wrap(radioButton).first().check({force: true})
            .should('be.checked')

            cy.wrap(radioButton)
            .eq(1)
            .check({force: true})

            cy.wrap(radioButton)
            .first()
            .should('not.be.checked')

            cy.wrap(radioButton)
            .eq(2)
            .should('be.disabled')
        })
    })

    it('checkboxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').check({force: true})

    })

    it('lists and dropdowns, theme color', () => {
        cy.visit('/')
/*1
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')
        cy.get('nb-layout-header nav')
        .should('have.css', 'background-color', 'rgb(34, 43, 69)')
*/2    
        cy.get('nav nb-select').then( dropdown => { // also cy.select
            cy.wrap(dropdown).click()
            cy.get('.options-list  nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if( index < 3){
                    cy.wrap(dropdown).click()
                }
    
    })
    })
    })

    it('web tables', () => {
                    cy.visit('/')
                    cy.contains('Tables & Data').click()
                    cy.contains('Smart Table').click()
                    //1
                    cy.get('tbody').contains('tr', 'Larry')
                    .then ( tableRow => {
                        cy.wrap(tableRow).find('.nb-edit').click()
                        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
                        cy.wrap(tableRow).find('.nb-checkmark').click()
                        cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
                    })

                    //2
                    cy.get('thead').find('.nb-plus').click()
                    cy.get('thead').find('tr').eq(2).then( tableRow => {
                        cy.wrap(tableRow).find('[placeholder="First Name"]').type('Mykhailo')
                        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Stieblov')
                        cy.wrap(tableRow).find('.nb-checkmark').click()
                    })

                    cy.get('tbody tr').first().find('td').then( tableColumns => {
                        cy.wrap(tableColumns).eq(2).should('contain', 'Mykhailo')
                        cy.wrap(tableColumns).eq(3).should('contain', 'Stieblov')
                    })

                    //3
                    const age = [20, 30, 40]
                    cy.wrap(age).each( age => {

                    cy.get('thead [placeholder="Age"]').clear().type(age)
                    cy.wait(1000)
                    cy.get('tbody tr').each( tableRow => {
                        if(age == 200){
                            cy.wrap(tableRow).should('contain', 'No Data Found')
                        } else {
                        cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                        }

                    })
                })



    })

    it('datepicker', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        let date = new Date()
            date.setDate(date.getDate() + 5)
            let futureDay = date.getDay()
            let futureMonth = date.getMonth()
            let futureYear = date.toLocaleString('default', {month: 'short'})

        cy
        .contains('nb-card', 'Common Datepicker')
        .find('input')
        .then( input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date')
            .then( dateAttribute => {
                if(!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                } else {
                    cy.get('nb-calendar-day-picker').contains(futureDay).click()
                }
            })
           /* cy
            .get('nb-calendar-day-picker')
            .contains('15')
            .click()
            cy.wrap(input).invoke('prop', 'value')
            .should('contain', 'Jan 15, 2023')
*/
        })
    })

})
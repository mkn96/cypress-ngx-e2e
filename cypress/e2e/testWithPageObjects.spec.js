import { navigateTo } from "../support/page_objects/navigationPage"

describe('Test with Page Objects', () => {
    beforeEach('open application', () => {
     cy.visit('/')
    })

    it('verify navigation across the pages', () => {
            navigateTo.formLayoutsPage()
            navigateTo.datePickerPage()
            navigateTo.toasterPage()
            navigateTo.tooltipPage()
            navigateTo.smartTablePage()
    })

})
import { navigateTo } from "../support/page_objects/navigationPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { onDatePickerPage } from "../support/page_objects/datePickerPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

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

    it.only('should sumbit Inine and Basic form and select tomorrow date in the calender', () =>{
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInLineFormWithNameAndEmail('Mykhail', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithNameAndEmail('test@test.com', 'abc123')
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRange(7, 16)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Mykhail', 'Stieblov')
        onSmartTablePage.updateAgeByFirstName('Mykhail', '35')
        onSmartTablePage.deleteRowsByIndex(1)
    })

})

import { BOARD, BoardPage } from "./pageObjects/board";
import { GLOBAL } from "./pageObjects/global";
import { LoginPage } from "./pageObjects/login";
import { STAGE } from "./pageObjects/stage";


describe("Stage Tests", () => {
    let timeout: number = GLOBAL.TIMEOUT;

    beforeEach(() => {
        cy.visit(Cypress.env("BASE_URL"));

        LoginPage.loginInApp(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));

        BoardPage.createBoard("Automation Tests");

        cy.get(BOARD.MODAL_BOARD_TITLE, {timeout: timeout})
        .contains("Automation Tests")
        .should("be.visible")
        .click({force: true});
    })

    it("Should be possible create new stage", () => {
        cy.get(STAGE.BTN_CREATE_NEW_STAGE, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(STAGE.INPUT_STAGE_NAME, {timeout: timeout})
        .should("be.visible")
        .type("Automation Stage");

        cy.get(STAGE.BTN_CREATE, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(GLOBAL.MESSAGE_MODAL_DESCRIPTION, {timeout: timeout})
        .should("be.visible")
        .and("contain", "Quadro criado com sucesso.");

        BoardPage.deleteBoard("Automation Tests");
    })

    it("Should not be possible create stage with invalid name", () => {
        cy.get(STAGE.BTN_CREATE_NEW_STAGE, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(STAGE.BTN_CREATE, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(GLOBAL.MESSAGE_MODAL_DESCRIPTION, {timeout: timeout})
        .should("be.visible")
        .and("contain", "Todos os campos devem ser preenchidos.");

        BoardPage.deleteBoard("Automation Tests");
    })

    it("Should be possible close create stage modal", () => {
        cy.get(STAGE.BTN_CREATE_NEW_STAGE, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(STAGE.BTN_CLOSE, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(BOARD.MODAL_CREATE_BOARD, {timeout: timeout})
        .should("not.exist")

        BoardPage.deleteBoard("Automation Tests");
    })

    it("Should be possible edit board name", () => {
        cy.get(STAGE.BTN_EDIT_BOARD, {timeout: timeout})
        .should("be.visible")
        .click({force: true})

        cy.get(STAGE.INPUT_STAGE_NAME, {timeout: timeout})
        .should("be.visible")
        .type("Update Stage");

        cy.get(STAGE.BTN_CREATE, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(STAGE.TEXT_BOARD_TITLE, {timeout: timeout})
        .should("be.visible")
        .and("contain", "Update Stage");

        BoardPage.deleteBoard("Update Stage");
    })
})
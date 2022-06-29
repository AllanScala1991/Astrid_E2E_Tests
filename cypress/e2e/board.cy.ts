import { BOARD, BoardPage } from "./pageObjects/board";
import { GLOBAL } from "./pageObjects/global";
import { LoginPage } from "./pageObjects/login";
import { STAGE } from "./pageObjects/stage";


describe("Board Tests", () => {
    let timeout: number = GLOBAL.TIMEOUT;

    beforeEach(() => {
        cy.visit(Cypress.env("BASE_URL"));

        LoginPage.loginInApp(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));
    })

    it("Should be possible create new board", () => {
        cy.get(BOARD.BTN_NEW_BOARD, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(BOARD.INPUT_BOARD_NAME, {timeout: timeout})
        .should("be.visible")
        .type("Automation Board");

        cy.get(BOARD.BTN_CREATE, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(GLOBAL.MESSAGE_MODAL_DESCRIPTION, {timeout: timeout})
        .should("be.visible")
        .and("contain", "Board criado com sucesso.");

        cy.get(GLOBAL.BTN_MESSAGE_OK, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(BOARD.MODAL_BOARD_TITLE, {timeout: timeout})
        .first()
        .should("be.visible")
        .and("contain", "Automation Board")
        .click({force: true});

        BoardPage.deleteBoard("Automation Board");
    })

    it("Should not be possible create board with empty name", () => {
        cy.get(BOARD.BTN_NEW_BOARD, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(BOARD.BTN_CREATE, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(GLOBAL.MESSAGE_MODAL_DESCRIPTION, {timeout: timeout})
        .should("be.visible")
        .and("contain", "Todos os campos devem ser preenchidos.");
    })

    it("Should be possible close create board modal", () => {
        cy.get(BOARD.BTN_NEW_BOARD, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(BOARD.BTN_CLOSE, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(BOARD.MODAL_CREATE_BOARD, {timeout: timeout})
        .should("not.exist")
    })
})
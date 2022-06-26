import { ACCOUNT } from "./pageObjects/account"
import { GLOBAL } from "./pageObjects/global"
import { LOGIN } from "./pageObjects/login"

describe("Account Tests", () => {
    let timeout: number = GLOBAL.TIMEOUT;

    beforeEach(() => {
        cy.visit(Cypress.env("BASE_URL"));

        cy.contains(LOGIN.BTN_REGISTER, {timeout: timeout})
        .should("be.visible")
        .click({force: true});
    })

    it("Should be possible create new account", () => {
        cy.get(ACCOUNT.INPUT_NAME, {timeout: timeout})
        .should("be.visible")
        .type("Automation Account");

        cy.get(ACCOUNT.INPUT_EMAIL, {timeout: timeout})
        .should("be.visible")
        .type("automation@mail.com");

        cy.get(ACCOUNT.INPUT_PASSWORD, {timeout: timeout})
        .should("be.visible")
        .type("123456");

        cy.contains(ACCOUNT.BTN_SAVE, {timeout: timeout})
        .should("be.visible")
        .click({force: true})

        cy.get(GLOBAL.MESSAGE_MODAL_DESCRIPTION, {timeout: timeout})
        .should("contain", "Usuário criado com sucesso.");

        cy.get(GLOBAL.BTN_MESSAGE_OK, {timeout: timeout})
        .should("be.visible")
        .click({force: true})

        cy.url().should(res => {
            expect(res).not.contain("/create")
        })
    })

    it("Should not be possible create new account with invalid e-mail", () => {
        cy.get(ACCOUNT.INPUT_NAME, {timeout: timeout})
        .should("be.visible")
        .type("Automation Account");

        cy.get(ACCOUNT.INPUT_EMAIL, {timeout: timeout})
        .should("be.visible")
        .type("automation.com");

        cy.get(ACCOUNT.INPUT_PASSWORD, {timeout: timeout})
        .should("be.visible")
        .type("123456");

        cy.contains(ACCOUNT.BTN_SAVE, {timeout: timeout})
        .should("be.visible")
        .click({force: true})

        cy.get(GLOBAL.MESSAGE_MODAL_DESCRIPTION, {timeout: timeout})
        .should("contain", "Email inválido.");

        cy.get(GLOBAL.BTN_MESSAGE_OK, {timeout: timeout})
        .should("be.visible")
        .click({force: true})

        cy.url().should(res => {
            expect(res).contain("/create")
        })
    })

    it("Should not be possible create new account with empty inputs", () => {
        cy.get(ACCOUNT.INPUT_EMAIL, {timeout: timeout})
        .should("be.visible")
        .type("automation.com");

        cy.get(ACCOUNT.INPUT_PASSWORD, {timeout: timeout})
        .should("be.visible")
        .type("123456");

        cy.contains(ACCOUNT.BTN_SAVE, {timeout: timeout})
        .should("be.visible")
        .click({force: true})

        cy.get(GLOBAL.MESSAGE_MODAL_DESCRIPTION, {timeout: timeout})
        .should("contain", "Todos os campos devem ser preenchidos.");

        cy.get(GLOBAL.BTN_MESSAGE_OK, {timeout: timeout})
        .should("be.visible")
        .click({force: true})

        cy.url().should(res => {
            expect(res).contain("/create")
        })
    })

    it("Should be possible redirect to login page with press back button", () => {
        cy.contains(ACCOUNT.BTN_BACK, {timeout: timeout})
        .should("be.visible")
        .click({force: true})

        cy.contains(LOGIN.BTN_ACCESS, {timeout: timeout})
        .should("be.visible")

        cy.url().should(res => {
            expect(res).not.contain("/create")
        })
    })
})
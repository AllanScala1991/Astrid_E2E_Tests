import { GLOBAL } from "./pageObjects/global";
import { LOGIN } from "./pageObjects/login";

describe("Login Tests", () => {
    let timeout: number = GLOBAL.TIMEOUT;

    beforeEach(() => {
        cy.visit(Cypress.env("BASE_URL"));
    })

    it("Should be possible to login", () => {
        cy.get(LOGIN.INPUT_EMAIL, {timeout: timeout})
        .should("be.visible")
        .type(Cypress.env("USER_EMAIL"))

        cy.get(LOGIN.INPUT_PASSWORD, {timeout: timeout})
        .should("be.visible")
        .type(Cypress.env("USER_PASSWORD"))

        cy.contains(LOGIN.BTN_ACCESS, {timeout: timeout})
        .should("be.visible")
        .click({force: true})

        cy.url().should(url => {
            expect(url).to.contain("/board");
        })
    })

    it("Should not be possible login with empty inputs", () => {
        cy.contains(LOGIN.BTN_ACCESS, {timeout: timeout})
        .should("be.visible")
        .click({force: true})

        cy.get(GLOBAL.MESSAGE_MODAL_DESCRIPTION, {timeout: timeout})
        .should("be.visible")
        .and("contain", "O email e a senha são obrigatórios.")
    })

    it("Should not possible login with not exist e-mail and password", () => {
        cy.get(LOGIN.INPUT_EMAIL, {timeout: timeout})
        .should("be.visible")
        .type("notExist@mail.com")

        cy.get(LOGIN.INPUT_PASSWORD, {timeout: timeout})
        .should("be.visible")
        .type("notexist")

        cy.contains(LOGIN.BTN_ACCESS, {timeout: timeout})
        .should("be.visible")
        .click({force: true})

        cy.get(GLOBAL.MESSAGE_MODAL_DESCRIPTION, {timeout: timeout})
        .should("be.visible")
        .and("contain", "Usuário e ou Senha incorretos.")
    })
})
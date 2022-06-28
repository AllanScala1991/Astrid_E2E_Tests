import { GLOBAL } from "./global"

export enum LOGIN {
    BTN_ACCESS = "Acessar",
    BTN_REGISTER = "Registrar",
    INPUT_EMAIL = ".inputEmail",
    INPUT_PASSWORD = ".inputPassword"
}

export class LoginPage {
    public timeout: number  = GLOBAL.TIMEOUT;

    loginInApp(email: string, password: string) {
        cy.get(LOGIN.INPUT_EMAIL, {timeout: this.timeout})
        .should("be.visible")
        .type(email)

        cy.get(LOGIN.INPUT_PASSWORD, {timeout: this.timeout})
        .should("be.visible")
        .type(password)

        cy.contains(LOGIN.BTN_ACCESS, {timeout: this.timeout})
        .should("be.visible")
        .click({force: true})
    }
}
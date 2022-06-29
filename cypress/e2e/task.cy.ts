import { BOARD, BoardPage } from "./pageObjects/board"
import { GLOBAL } from "./pageObjects/global"
import { LoginPage } from "./pageObjects/login"
import { StagePage } from "./pageObjects/stage";
import { TASK } from "./pageObjects/task";


describe("Task Tests", () => {
    let timeout: number = GLOBAL.TIMEOUT;

    beforeEach(() => {
        cy.visit(Cypress.env("BASE_URL"));

        LoginPage.loginInApp(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));

        BoardPage.createBoard("Automation Board");

        cy.get(BOARD.MODAL_BOARD_TITLE, {timeout: timeout})
        .contains("Automation Board")
        .should("be.visible")
        .click({force: true});

        StagePage.createStage("Automation Stage");
    })

    it("Should be possible create new task", () => {
        cy.get(TASK.BTN_ADD, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(TASK.INPUT_TASK_NAME, {timeout: timeout})
        .should("be.visible")
        .type("Automation Task");

        cy.get(TASK.INPUT_TASK_DESCRIPTION, {timeout: timeout})
        .should("be.visible")
        .type("Automation Task");

        cy.get(TASK.SELECT_URGENCY, {timeout: timeout})
        .should("be.visible")
        .select("high");

        cy.get(TASK.BTN_SAVE, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(GLOBAL.MESSAGE_MODAL_DESCRIPTION, {timeout: timeout})
        .should("be.visible")
        .and("contain", "Task criada com sucesso.");
    })

    it("Should not possible create task with empty inputs", () => {
        cy.get(TASK.BTN_ADD, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(TASK.BTN_SAVE, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(GLOBAL.MESSAGE_MODAL_DESCRIPTION, {timeout: timeout})
        .should("be.visible")
        .and("contain", "Campos obrigatórios devem ser preenchidos.");
    })

    it("Should be possible close create task modal", () => {
        cy.get(TASK.BTN_ADD, {timeout: timeout})
        .should("be.visible")
        .click({force: true});
        
        cy.get(GLOBAL.LOADING_IMAGE, {timeout: timeout})
        .should("not.exist")

        cy.get(TASK.MODAL_CREATE_TASK, {timeout: timeout})
        .should("exist");

        cy.get(TASK.BTN_CLOSE, {timeout: timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(TASK.MODAL_CREATE_TASK, {timeout: timeout})
        .should("not.exist");

    })

    afterEach(() => {
        BoardPage.deleteBoard("Automation Board")
    })
})
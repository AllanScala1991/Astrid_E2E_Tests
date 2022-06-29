import { GLOBAL } from "./global";
import { LEFTBAR } from "./leftbar";
import { STAGE } from "./stage";

export enum BOARD {
    BTN_NEW_BOARD = ".addBoardContainer",
    INPUT_BOARD_NAME = ".inputModal",
    BTN_CREATE = '[style="color: white; background-color: rgb(26, 174, 159); width: 82%;"]',
    BTN_CLOSE = '[style="color: white; background-color: rgb(211, 69, 91); width: 82%;"]',
    MODAL_BOARD_TITLE = ".boardTitle",
    MODAL_CREATE_BOARD = ".createModal"
}


export class BoardPage {
    public static timeout: number = GLOBAL.TIMEOUT;

    static createBoard(boardName: string) {
        cy.get(BOARD.BTN_NEW_BOARD, {timeout: this.timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(BOARD.INPUT_BOARD_NAME, {timeout: this.timeout})
        .should("be.visible")
        .type(boardName);

        cy.get(BOARD.BTN_CREATE, {timeout: this.timeout})
        .should("be.visible")
        .click({force: true});
    }

    static deleteBoard(boardName: string) {
        cy.visit(`${Cypress.env("BASE_URL")}board`);

        cy.get(BOARD.MODAL_BOARD_TITLE, {timeout: this.timeout})
        .contains(boardName)
        .should("be.visible")
        .click({force: true});

        cy.get(STAGE.BTN_DELETE_BOARD, {timeout: this.timeout})
        .should("be.visible")
        .click({force: true})
    }
}
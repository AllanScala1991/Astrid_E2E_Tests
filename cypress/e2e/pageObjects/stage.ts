import { GLOBAL } from "./global";

export enum STAGE {
    BTN_DELETE_BOARD = "#root > div > div.rightMenu > div.header > svg:nth-child(3)",
    BTN_EDIT_BOARD = "#root > div > div.rightMenu > div.header > svg:nth-child(2)",
    TEXT_BOARD_TITLE = ".titles",   
    BTN_CREATE_NEW_STAGE = ".AddPlanButton",
    INPUT_STAGE_NAME = ".inputModal",
    BTN_CREATE = '[style="color: white; background-color: rgb(26, 174, 159); width: 82%;"]',
    BTN_CLOSE = '[style="color: white; background-color: rgb(211, 69, 91); width: 82%;"]'
}

export class StagePage {
    public static timeout: number = GLOBAL.TIMEOUT;

    static createStage(stageName: string) {
        cy.get(STAGE.BTN_CREATE_NEW_STAGE, {timeout: this.timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(STAGE.INPUT_STAGE_NAME, {timeout: this.timeout})
        .should("be.visible")
        .type(stageName);

        cy.get(STAGE.BTN_CREATE, {timeout: this.timeout})
        .should("be.visible")
        .click({force: true});

        cy.get(GLOBAL.BTN_MESSAGE_OK, {timeout: this.timeout})
        .should("be.visible")
        .click({force: true});
    }
}
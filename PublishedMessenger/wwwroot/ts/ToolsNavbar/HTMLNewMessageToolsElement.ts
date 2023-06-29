import { HTMLSelectAccountManagerElement } from "../SelectAccount/HTMLSelectAccountManagerElement.js";
import { HTMLAddAsSecondaryContactElement } from "./HTMLAddAsSecondaryContactElement.js";
import { HTMLExtendedSelectAccountElement } from "./HTMLExtendedSelectAccountElement.js";
import { HTMLMessageDateElement } from "./HTMLMessageDateElement.js";
import { HTMLMessageTimeElement } from "./HTMLMessageTimeElement.js";
import { HTMLMessageSendElement } from "./HTMLMessageSendElement.js";
import { HTMLSetAsMainContactElement } from "./HTMLSetAsMainContactElement.js";
import { HTMLToolsNavbarElement } from "./HTMLToolsNavbarElement.js";
import { ToolsBase } from "./ToolsBase.js";
import { HTMLDateAndTimeElement } from "./HTMLDateAndTimeElement.js";
import { AccountData } from "../SelectAccount/AccountData.js";

export class HTMLNewMessageToolsElement extends ToolsBase {

    private readonly _send: HTMLMessageSendElement;
    private readonly _dateAndTime: HTMLDateAndTimeElement;
    private readonly _addAsSecondaryContact: HTMLAddAsSecondaryContactElement;
    private readonly _setAsMainContact: HTMLSetAsMainContactElement;
    private readonly _selectAccount: HTMLExtendedSelectAccountElement;
    
    constructor(toolsNavbar: HTMLToolsNavbarElement) {
        super(toolsNavbar);

        this._send = new HTMLMessageSendElement(this);
        this._dateAndTime = new HTMLDateAndTimeElement(this);
        this._addAsSecondaryContact = new HTMLAddAsSecondaryContactElement(this);
        this._setAsMainContact = new HTMLSetAsMainContactElement(this);
        this._selectAccount = new HTMLExtendedSelectAccountElement(this);

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
    }

    private setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.top = "0px";
        this.style.left = "48px";
        this.style.height = "100%";
        this.style.width = "calc(100% - 48px)";
    }

    private createElements(): void {
        this.shadowRoot.appendChild(this._send);
        this.shadowRoot.appendChild(this._dateAndTime);
        this.shadowRoot.appendChild(this._addAsSecondaryContact);
        this.shadowRoot.appendChild(this._setAsMainContact);
        this.shadowRoot.appendChild(this._selectAccount);

        this._addAsSecondaryContact.setEnabality(false);
        this._setAsMainContact.setEnabality(false);
    }

    public setSendFunctionName(functionName: string): void {
        this._send.setFunctionName(functionName);
    }

    public setSelectAccountManager(selectAccountManager: HTMLSelectAccountManagerElement): void {
        this._selectAccount.setSelectAccountManager(selectAccountManager);
    }

    public searchOnSelectAccount(searchedText: string): void {
        this._selectAccount.search(searchedText);
    }

    public getSelectedAccountData(): AccountData {
        const selectedAccountData = this._selectAccount.getSelectedAccountData();
        return selectedAccountData;
    }

    public setSelectAccountNull(): void {
        this._selectAccount.setValue(null);
    }

    public setSelectFunction(functionName: string): void {
        this._selectAccount.setSelectionFunction(functionName);
    }

    public setSetAsMainContactEnabality(value: boolean): void {
        this._setAsMainContact.setEnabality(value);
    }

    public getSetAsMainContactEnabality(): boolean {
        return this._setAsMainContact.getEnabality();
    }

    public setSetAsMainContactFunction(functionName: string): void {
        this._setAsMainContact.setFunctionName(functionName);
    }

    public setAddAsSecondaryContactEnabality(value: boolean) {
        this._addAsSecondaryContact.setEnabality(value);
    }

    public getAddAsSecondaryContactEnabality(): boolean {
        return this._setAsMainContact.getEnabality();
    }

    public setAddAsSecondaryContactFunction(functionName: string): void {
        this._addAsSecondaryContact.setFunctionName(functionName);
    }

    public getDate(): string {
        const date = this._dateAndTime.getDate();
        return date;
    }

    public getTime(): string {
        const time = this._dateAndTime.getTime();
        return time;
    }

}

window.customElements.define("new-message-tools", HTMLNewMessageToolsElement);



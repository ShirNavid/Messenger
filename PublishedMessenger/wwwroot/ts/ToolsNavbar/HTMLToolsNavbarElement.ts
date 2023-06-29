import { HTMLToolsNavbarMenuElement } from "./HTMLToolsNavbarMenuElement.js";
import { HTMLReceivedMessagesToolsElement } from "./HTMLReceivedMessagesToolsElement.js";
import { ToolsBase } from "./ToolsBase.js";
import { HTMLNewMessageToolsElement } from "./HTMLNewMessageToolsElement.js";
import { HTMLSelectAccountManagerElement } from "../SelectAccount/HTMLSelectAccountManagerElement.js";
import { AccountData } from "../SelectAccount/AccountData.js";
import { HTMLShowMessageToolsElement } from "./HTMLShowMessageToolsElement.js";
import { HTMLSendedMessagesToolsElement } from "./HTMLSendedMessagesToolsElement.js";
import { HTMLReplyMessageToolsElement } from "./HTMLReplyMessageToolsElement.js";

export class HTMLToolsNavbarElement extends HTMLElement {

    private _menu: HTMLToolsNavbarMenuElement;
    private _tools: ToolsBase;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this._menu = new HTMLToolsNavbarMenuElement(this);
        this._tools = null;
    }

    private connectedCallback(): void {
        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
    }

    private setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "block";
        this.style.width = "94%";
        this.style.height = "40px";
        this.style.left = "50%";
        this.style.transform = "translateX(-50%)";
        this.style.borderRadius = "5px";
        this.style.backgroundColor = "white";
        this.style.margin = "6px 0px";
        this.style.boxShadow = "0px 2px 3px lightgrey";
        this.style.top = "5px";
        this.style.zIndex = "6";
    }

    private createElements(): void {
        this.shadowRoot.appendChild(this._menu);
    }

    public setTools(url: string): void {
        if (this._tools != null) {
            this._tools.remove();
        }
        this._tools = this.getTools(url);
        this.shadowRoot.appendChild(this._tools);
    }

    public getMarkAsReadEnability(): boolean {
        return (this._tools as HTMLReceivedMessagesToolsElement).getMarkAsReadEnability();
    }

    public setMarkAsReadEnability(value: boolean): void {
        (this._tools as HTMLReceivedMessagesToolsElement).setMarkAsReadEnability(value);
    }

    public setMarkAsReadFunction(functionName: string): void {
        (this._tools as HTMLReceivedMessagesToolsElement).setMarkAsReadFunction(functionName);
    }

    public getPinEnability(): boolean {
        return (this._tools as HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement).getPinEnability();
    }

    public setPinEnability(value: boolean): void {
        (this._tools as HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement).setPinEnability(value);
    }

    public setPinFunction(functionName: string): void {
        (this._tools as HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement).setPinFunction(functionName);
    }

    public getDeleteEnability(): boolean {
        return (this._tools as HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement).getDeleteEnability();
    }

    public setDeleteEnability(value: boolean): void {
        (this._tools as HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement).setDeleteEnability(value);
    }

    public setDeleteFunction(functionName: string): void {
        (this._tools as HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement).setDeleteFunction(functionName);
    }

    public getReplyEnability(): boolean {
        return (this._tools as HTMLReceivedMessagesToolsElement).getReplyEnability();
    }

    public setReplyEnability(value: boolean): void {
        (this._tools as HTMLReceivedMessagesToolsElement).setReplyEnability(value);
    }

    public setReplyFunction(functionName: string): void {
        (this._tools as HTMLReceivedMessagesToolsElement).setReplyFunction(functionName);
    }

    public setShowFunction(functionName: string): void {
        (this._tools as HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement).setShowFunction(functionName);
    }

    public getShowEnability(): boolean {
        return (this._tools as HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement).getShowEnability();
    }

    public setShowEnability(value: boolean): void {
        (this._tools as HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement).setShowEnability(value);
    }

    public setSendFunctionName(functionName: string): void {
        (this._tools as HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement).setSendFunctionName(functionName);
    }

    public setSelectAccountManager(selectAccountManager: HTMLSelectAccountManagerElement): void {
        (this._tools as HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement).setSelectAccountManager(selectAccountManager);
    }

    public searchOnSelectAccount(searchedText: string): void {
        (this._tools as HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement).searchOnSelectAccount(searchedText);
    }

    public setSetAsMainContactEnabality(value: boolean): void {
        (this._tools as HTMLNewMessageToolsElement).setSetAsMainContactEnabality(value);
    }

    public getSetAsMainContactEnability(): boolean {
        return (this._tools as HTMLNewMessageToolsElement).getSetAsMainContactEnabality();
    }

    public setSetAsMainContactFunction(functionName: string): void {
        (this._tools as HTMLNewMessageToolsElement).setSetAsMainContactFunction(functionName);
    }

    public setAddAsSecondaryContactEnabality(value: boolean): void {
        (this._tools as HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement).setAddAsSecondaryContactEnabality(value);
    }

    public getAddAsSecondaryContactEnabality(): boolean {
        return (this._tools as HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement).getAddAsSecondaryContactEnabality();
    }

    public setAddAsSecondaryContactFunction(functionName: string): void {
        (this._tools as HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement).setAddAsSecondaryContactFunction(functionName);
    }

    public getDate(): string {
        const date = (this._tools as HTMLNewMessageToolsElement).getDate();
        return date;
    }

    public getTime(): string {
        const time = (this._tools as HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement).getTime();
        return time;
    }

    public getSelectedAccountData(): AccountData {
        const accountData = (this._tools as HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement).getSelectedAccountData();
        return accountData;
    }

    public setSelectAccountSelectionFunction(functionName: string): void {
        (this._tools as HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement).setSelectFunction(functionName);
    }

    public setSelectAccountNull(): void {
        (this._tools as HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement).setSelectAccountNull();
    }

    private getTools(url: string): ToolsBase {
        let tools: ToolsBase;

        if (url == "ReceivedMessages") {
            tools = new HTMLReceivedMessagesToolsElement(this);
        }

        else if (url == "SendedMessages") {
            tools = new HTMLSendedMessagesToolsElement(this);
        }

        else if (url == "NewMessage") {
            tools = new HTMLNewMessageToolsElement(this);
        }

        else if (url == "ShowMessage") {
            tools = new HTMLShowMessageToolsElement(this);
        }

        else if (url == "Reply") {
            tools = new HTMLReplyMessageToolsElement(this);
        }

        return tools;
    }

}

window.customElements.define("tools-navbar", HTMLToolsNavbarElement);


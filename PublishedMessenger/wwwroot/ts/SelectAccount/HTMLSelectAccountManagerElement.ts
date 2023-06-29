import { getData, runVoidMethod } from "../GeneralClasses/JsToTs.js";
import { AccountData } from "./AccountData.js";
import { HTMLSelectAccountElement } from "./HTMLSelectAccountElement.js";

export class HTMLSelectAccountManagerElement extends HTMLElement {

    private _selectAccountId: string;
    private _replyId: number;
    private _senderId: number;
    private _mainReceiverId: number;
    private _selectAccount: HTMLSelectAccountElement;

    constructor() {
        super();
    }

    private connectedCallback(): void {
        this._selectAccountId = this.getAttribute("select-account-id");
    }

    public setProps(replyId: number, senderId: number, mainReceiverId: number): void {
        this._replyId = replyId;
        this._senderId = senderId;
        this._mainReceiverId = mainReceiverId;
    }

    public setSelectAccount(selectAccount: HTMLSelectAccountElement): void {
        this._selectAccount = selectAccount;
        this._selectAccount.setElement();
    }

    public getSelectAccountItemsData(): AccountData[] {
        const parameters = { "selectAccountId": this._selectAccountId, "replyId": this._replyId, "senderId": this._senderId, "mainReceiverId": this._mainReceiverId };
        const selectAccountItemsData = getData("GetAccountsData", parameters) as AccountData[];
        return selectAccountItemsData;
    }

    public getRepliedAccountData(): AccountData {
        const parameters = { "selectAccountId": this._selectAccountId, "mainReceiverId": this._mainReceiverId };
        const repliedAccountData = getData("GetRepliedAccountData", parameters) as AccountData;
        return repliedAccountData;
    }

    public search(searchedText: string): void {
        const parameters = { "selectAccountId": this._selectAccountId, "searchedText": searchedText };
        runVoidMethod("SelectSearch", parameters);
    }

}

window.customElements.define("select-account-manager", HTMLSelectAccountManagerElement);
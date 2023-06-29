import { getData, runVoidMethod } from "../GeneralClasses/JsToTs.js";
export class HTMLSelectAccountManagerElement extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this._selectAccountId = this.getAttribute("select-account-id");
    }
    setProps(replyId, senderId, mainReceiverId) {
        this._replyId = replyId;
        this._senderId = senderId;
        this._mainReceiverId = mainReceiverId;
    }
    setSelectAccount(selectAccount) {
        this._selectAccount = selectAccount;
        this._selectAccount.setElement();
    }
    getSelectAccountItemsData() {
        const parameters = { "selectAccountId": this._selectAccountId, "replyId": this._replyId, "senderId": this._senderId, "mainReceiverId": this._mainReceiverId };
        const selectAccountItemsData = getData("GetAccountsData", parameters);
        return selectAccountItemsData;
    }
    getRepliedAccountData() {
        const parameters = { "selectAccountId": this._selectAccountId, "mainReceiverId": this._mainReceiverId };
        const repliedAccountData = getData("GetRepliedAccountData", parameters);
        return repliedAccountData;
    }
    search(searchedText) {
        const parameters = { "selectAccountId": this._selectAccountId, "searchedText": searchedText };
        runVoidMethod("SelectSearch", parameters);
    }
}
window.customElements.define("select-account-manager", HTMLSelectAccountManagerElement);
//# sourceMappingURL=HTMLSelectAccountManagerElement.js.map
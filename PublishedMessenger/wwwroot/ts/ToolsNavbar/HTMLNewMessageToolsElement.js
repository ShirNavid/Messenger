import { HTMLAddAsSecondaryContactElement } from "./HTMLAddAsSecondaryContactElement.js";
import { HTMLExtendedSelectAccountElement } from "./HTMLExtendedSelectAccountElement.js";
import { HTMLMessageSendElement } from "./HTMLMessageSendElement.js";
import { HTMLSetAsMainContactElement } from "./HTMLSetAsMainContactElement.js";
import { ToolsBase } from "./ToolsBase.js";
import { HTMLDateAndTimeElement } from "./HTMLDateAndTimeElement.js";
export class HTMLNewMessageToolsElement extends ToolsBase {
    constructor(toolsNavbar) {
        super(toolsNavbar);
        this._send = new HTMLMessageSendElement(this);
        this._dateAndTime = new HTMLDateAndTimeElement(this);
        this._addAsSecondaryContact = new HTMLAddAsSecondaryContactElement(this);
        this._setAsMainContact = new HTMLSetAsMainContactElement(this);
        this._selectAccount = new HTMLExtendedSelectAccountElement(this);
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.top = "0px";
        this.style.left = "48px";
        this.style.height = "100%";
        this.style.width = "calc(100% - 48px)";
    }
    createElements() {
        this.shadowRoot.appendChild(this._send);
        this.shadowRoot.appendChild(this._dateAndTime);
        this.shadowRoot.appendChild(this._addAsSecondaryContact);
        this.shadowRoot.appendChild(this._setAsMainContact);
        this.shadowRoot.appendChild(this._selectAccount);
        this._addAsSecondaryContact.setEnabality(false);
        this._setAsMainContact.setEnabality(false);
    }
    setSendFunctionName(functionName) {
        this._send.setFunctionName(functionName);
    }
    setSelectAccountManager(selectAccountManager) {
        this._selectAccount.setSelectAccountManager(selectAccountManager);
    }
    searchOnSelectAccount(searchedText) {
        this._selectAccount.search(searchedText);
    }
    getSelectedAccountData() {
        const selectedAccountData = this._selectAccount.getSelectedAccountData();
        return selectedAccountData;
    }
    setSelectAccountNull() {
        this._selectAccount.setValue(null);
    }
    setSelectFunction(functionName) {
        this._selectAccount.setSelectionFunction(functionName);
    }
    setSetAsMainContactEnabality(value) {
        this._setAsMainContact.setEnabality(value);
    }
    getSetAsMainContactEnabality() {
        return this._setAsMainContact.getEnabality();
    }
    setSetAsMainContactFunction(functionName) {
        this._setAsMainContact.setFunctionName(functionName);
    }
    setAddAsSecondaryContactEnabality(value) {
        this._addAsSecondaryContact.setEnabality(value);
    }
    getAddAsSecondaryContactEnabality() {
        return this._setAsMainContact.getEnabality();
    }
    setAddAsSecondaryContactFunction(functionName) {
        this._addAsSecondaryContact.setFunctionName(functionName);
    }
    getDate() {
        const date = this._dateAndTime.getDate();
        return date;
    }
    getTime() {
        const time = this._dateAndTime.getTime();
        return time;
    }
}
window.customElements.define("new-message-tools", HTMLNewMessageToolsElement);
//# sourceMappingURL=HTMLNewMessageToolsElement.js.map
import { HTMLToolsNavbarMenuElement } from "./HTMLToolsNavbarMenuElement.js";
import { HTMLReceivedMessagesToolsElement } from "./HTMLReceivedMessagesToolsElement.js";
import { HTMLNewMessageToolsElement } from "./HTMLNewMessageToolsElement.js";
import { HTMLShowMessageToolsElement } from "./HTMLShowMessageToolsElement.js";
import { HTMLSendedMessagesToolsElement } from "./HTMLSendedMessagesToolsElement.js";
import { HTMLReplyMessageToolsElement } from "./HTMLReplyMessageToolsElement.js";
export class HTMLToolsNavbarElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._menu = new HTMLToolsNavbarMenuElement(this);
        this._tools = null;
    }
    connectedCallback() {
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
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
    createElements() {
        this.shadowRoot.appendChild(this._menu);
    }
    setTools(url) {
        if (this._tools != null) {
            this._tools.remove();
        }
        this._tools = this.getTools(url);
        this.shadowRoot.appendChild(this._tools);
    }
    getMarkAsReadEnability() {
        return this._tools.getMarkAsReadEnability();
    }
    setMarkAsReadEnability(value) {
        this._tools.setMarkAsReadEnability(value);
    }
    setMarkAsReadFunction(functionName) {
        this._tools.setMarkAsReadFunction(functionName);
    }
    getPinEnability() {
        return this._tools.getPinEnability();
    }
    setPinEnability(value) {
        this._tools.setPinEnability(value);
    }
    setPinFunction(functionName) {
        this._tools.setPinFunction(functionName);
    }
    getDeleteEnability() {
        return this._tools.getDeleteEnability();
    }
    setDeleteEnability(value) {
        this._tools.setDeleteEnability(value);
    }
    setDeleteFunction(functionName) {
        this._tools.setDeleteFunction(functionName);
    }
    getReplyEnability() {
        return this._tools.getReplyEnability();
    }
    setReplyEnability(value) {
        this._tools.setReplyEnability(value);
    }
    setReplyFunction(functionName) {
        this._tools.setReplyFunction(functionName);
    }
    setShowFunction(functionName) {
        this._tools.setShowFunction(functionName);
    }
    getShowEnability() {
        return this._tools.getShowEnability();
    }
    setShowEnability(value) {
        this._tools.setShowEnability(value);
    }
    setSendFunctionName(functionName) {
        this._tools.setSendFunctionName(functionName);
    }
    setSelectAccountManager(selectAccountManager) {
        this._tools.setSelectAccountManager(selectAccountManager);
    }
    searchOnSelectAccount(searchedText) {
        this._tools.searchOnSelectAccount(searchedText);
    }
    setSetAsMainContactEnabality(value) {
        this._tools.setSetAsMainContactEnabality(value);
    }
    getSetAsMainContactEnability() {
        return this._tools.getSetAsMainContactEnabality();
    }
    setSetAsMainContactFunction(functionName) {
        this._tools.setSetAsMainContactFunction(functionName);
    }
    setAddAsSecondaryContactEnabality(value) {
        this._tools.setAddAsSecondaryContactEnabality(value);
    }
    getAddAsSecondaryContactEnabality() {
        return this._tools.getAddAsSecondaryContactEnabality();
    }
    setAddAsSecondaryContactFunction(functionName) {
        this._tools.setAddAsSecondaryContactFunction(functionName);
    }
    getDate() {
        const date = this._tools.getDate();
        return date;
    }
    getTime() {
        const time = this._tools.getTime();
        return time;
    }
    getSelectedAccountData() {
        const accountData = this._tools.getSelectedAccountData();
        return accountData;
    }
    setSelectAccountSelectionFunction(functionName) {
        this._tools.setSelectFunction(functionName);
    }
    setSelectAccountNull() {
        this._tools.setSelectAccountNull();
    }
    getTools(url) {
        let tools;
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
//# sourceMappingURL=HTMLToolsNavbarElement.js.map
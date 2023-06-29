import { HTMLSelectAccountListElement } from "./HTMLSelectAccountListElement.js";
import { HTMLSelectAccountSelectedItemElement } from "./HTMLSelectAccountSelectedItemElement.js";
export class HTMLSelectAccountElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    setSelectAccountManager(selectAccountManager) {
        this._selectAccountManager = selectAccountManager;
        this._selectAccountManager.setSelectAccount(this);
    }
    setElement() {
        const accountsData = this._selectAccountManager.getSelectAccountItemsData();
        this._itemsLength = accountsData.length;
        this._selectAccountSelectedItem = new HTMLSelectAccountSelectedItemElement(this);
        this._selectAccountList = new HTMLSelectAccountListElement(this, accountsData);
        this._isOpened = false;
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.width = "300px";
        this.style.borderRadius = "5px";
        this.style.backgroundColor = "transparent";
        this.style.height = "30px";
    }
    createElements() {
        if (this._selectAccountSelectedItem != undefined) {
            this._selectAccountSelectedItem.remove();
            this._selectAccountList.remove();
        }
        this.shadowRoot.appendChild(this._selectAccountSelectedItem);
        this.shadowRoot.appendChild(this._selectAccountList);
    }
    getOpenedHeight() {
        const height = (Math.min(30 * (this._itemsLength + 1), 280) + 5) + "px";
        return height;
    }
    searchAndSetItems(searchedText) {
        this._selectAccountManager.search(searchedText);
        this.createElements();
    }
    setValue(value) {
        this._selectAccountSelectedItem.setValue(value);
        this.runSelectionFunction();
    }
    mouseOverEvent() {
        if (!this._isOpened) {
            this._selectAccountSelectedItem.mouseOverEvent();
        }
    }
    mouseLeaveEvent() {
        if (!this._isOpened) {
            this._selectAccountSelectedItem.mouseLeaveEvent();
        }
    }
    changeListStatus() {
        if (this._isOpened == false) {
            this._isOpened = true;
            this.style.height = this.getOpenedHeight();
            this._selectAccountList.setOpened();
            this._selectAccountSelectedItem.mouseOverEvent();
        }
        else {
            this.close();
        }
    }
    close() {
        if (this._isOpened == true) {
            this._isOpened = false;
            this.style.height = "30px";
            this._selectAccountSelectedItem.mouseLeaveEvent();
            this._selectAccountList.setClosed();
        }
    }
    search(searchedText) {
        this._selectAccountManager.search(searchedText);
        this.setElement();
    }
    getSelectedAccountData() {
        const selectedAccountData = this._selectAccountSelectedItem.getAccountData();
        return selectedAccountData;
    }
    setSelectionFunction(functionName) {
        this._functionName = functionName;
    }
    runSelectionFunction() {
        eval(this._functionName + "()");
    }
}
window.customElements.define("select-account", HTMLSelectAccountElement);
//# sourceMappingURL=HTMLSelectAccountElement.js.map
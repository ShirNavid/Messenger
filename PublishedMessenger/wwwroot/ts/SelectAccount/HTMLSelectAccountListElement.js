import { HTMLSelectAccountItemElement } from "./HTMLSelectAccountItemElement.js";
export class HTMLSelectAccountListElement extends HTMLElement {
    constructor(selectAccount, accountsData) {
        super();
        this.attachShadow({ mode: 'open' });
        this._selectAccount = selectAccount;
        this._itemsLength = accountsData.length;
        this._selectAccountItems = accountsData.map((c, i) => new HTMLSelectAccountItemElement(this, c, i));
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "none";
        this.style.overflowY = "scroll";
        this.style.overflow = "hidden";
        this.style.width = "298px";
        this.style.height = this.getHeight();
        this.style.left = "0px";
        this.style.top = "31px";
        this.style.borderRadius = "5px";
        this.style.border = "solid rgb(240, 240, 240) 1px";
    }
    createElements() {
        this._selectAccountItems.forEach(c => this.shadowRoot.appendChild(c));
    }
    getHeight() {
        const height = Math.min((this._itemsLength * 30) + 1, 281) + "px";
        return height;
    }
    changeListStatus() {
        this._selectAccount.changeListStatus();
    }
    setOpened() {
        this.style.display = "inline-block";
    }
    close() {
        this._selectAccount.close();
    }
    setClosed() {
        this.style.display = "none";
    }
    setValue(accountData) {
        this._selectAccount.setValue(accountData);
    }
}
window.customElements.define("select-account-list", HTMLSelectAccountListElement);
//# sourceMappingURL=HTMLSelectAccountListElement.js.map
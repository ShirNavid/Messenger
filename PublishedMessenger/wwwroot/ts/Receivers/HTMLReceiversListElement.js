import { HTMLMainContactElement } from "./HTMLMainContactElement.js";
import { HTMLSecondaryContactElement } from "./HTMLSecondaryContactElement.js";
export class HTMLReceiversListElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._mainContact = null;
        this._secondaryContacts = new Array();
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "relative";
        this.style.display = "block";
        this.style.width = "calc(100% - 40px)";
        this.style.height = "57px";
        this.style.left = "20px";
        this.style.padding = "12px 12px";
        this.style.boxSizing = "border-box";
        this.style.overflowY = "auto";
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "~/css/Components/Scroll.css";
        this.shadowRoot.appendChild(link);
    }
    createElements() {
    }
    setMainReceiverId(mainReceiverId) {
        this._mainReceiverId = mainReceiverId;
    }
    setMainContact(accountData) {
        if (this._mainContact != null) {
            this._mainContact.remove();
        }
        const isFixed = this._mainReceiverId == accountData.id;
        this._mainContact = new HTMLMainContactElement(this, accountData, isFixed);
        this.shadowRoot.prepend(this._mainContact);
    }
    getMainContact() {
        let accountData = null;
        if (this._mainContact != null) {
            accountData = this._mainContact.getAccountData();
        }
        return accountData;
    }
    addSecondaryContact(accountData) {
        const secondaryContact = new HTMLSecondaryContactElement(this, accountData);
        this._secondaryContacts.push(secondaryContact);
        this.shadowRoot.appendChild(secondaryContact);
    }
    getSecondaryContacts() {
        const accountDatas = this._secondaryContacts.map(c => c.getAccountData());
        return accountDatas;
    }
    removeReceiverItem(receiverItem) {
        if (this._mainContact == receiverItem) {
            this._mainContact = null;
        }
        else {
            const index = this._secondaryContacts.map(c => c).indexOf(receiverItem);
            this._secondaryContacts.splice(index, 1);
            receiverItem.remove();
        }
        eval(this._functionName + "()");
    }
    setRemovalFunction(functionName) {
        this._functionName = functionName;
    }
}
window.customElements.define("receivers-list", HTMLReceiversListElement);
//# sourceMappingURL=HTMLReceiversListElement.js.map
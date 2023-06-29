import { HTMLSelectAccountSelectedItemTextElement } from "./HTMLSelectAccountSelectedItemTextElement.js";
import { HTMLSelectAccountSelectedItemImageElement } from "./HTMLSelectAccountSelectedItemImageElement.js";
export class HTMLSelectAccountSelectedItemElement extends HTMLElement {
    constructor(selectAccount) {
        super();
        this.attachShadow({ mode: 'open' });
        this._selectAccount = selectAccount;
        this._selectAccountSelectedItemText = new HTMLSelectAccountSelectedItemTextElement(this, null);
        this._selectAccountSelectedItemImage = new HTMLSelectAccountSelectedItemImageElement(this, null);
        this._accountData = null;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "30px";
        this.style.width = "300px";
        this.style.top = "0px";
        this.style.left = "0px";
        this.style.backgroundColor = "rgb(55, 91, 122)";
        this.style.borderBottom = "solid 1px rgb(55, 91, 122)";
        this.style.borderRadius = "4px";
    }
    createElements() {
        this.shadowRoot.appendChild(this._selectAccountSelectedItemImage);
        this.shadowRoot.appendChild(this._selectAccountSelectedItemText);
    }
    setEvents() {
        this.addEventListener("mouseover", function (event) {
            this._selectAccount.mouseOverEvent();
        });
        this.addEventListener("mouseleave", function (event) {
            this._selectAccount.mouseLeaveEvent();
        });
    }
    changeListStatus() {
        this._selectAccount.changeListStatus();
    }
    setValue(value) {
        this._accountData = value;
        if (value != null) {
            this._selectAccountSelectedItemText.setValue(value.text);
            this._selectAccountSelectedItemImage.setValue(value.image);
        }
        else {
            this._selectAccountSelectedItemText.setValue("");
            this._selectAccountSelectedItemImage.setValue("");
        }
    }
    mouseOverEvent() {
        this.style.backgroundColor = "rgb(39, 64, 86)";
    }
    mouseLeaveEvent() {
        this.style.backgroundColor = "rgb(55, 91, 122)";
    }
    getAccountData() {
        return this._accountData;
    }
}
window.customElements.define("select-account-selected-item", HTMLSelectAccountSelectedItemElement);
//# sourceMappingURL=HTMLSelectAccountSelectedItemElement.js.map
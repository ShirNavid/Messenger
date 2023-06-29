import { HTMLSelectAccountItemImageElement } from "./HTMLSelectAccountItemImageElement.js";
import { HTMLSelectAccountItemTextElement } from "./HTMLSelectAccountItemTextElement.js";
export class HTMLSelectAccountItemElement extends HTMLElement {
    constructor(selectAccountList, accountData, index) {
        super();
        this.attachShadow({ mode: 'open' });
        this._selectAccountList = selectAccountList;
        this._accountData = accountData;
        this._index = index;
        this._selectAccountItemText = new HTMLSelectAccountItemTextElement(this, accountData.text);
        this._selectAccountItemImage = new HTMLSelectAccountItemImageElement(this, accountData.image);
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.width = "100%";
        this.style.height = "29px";
        this.style.top = ((this._index * 30) + 1) + "px";
        this.style.left = "0px";
        if (this._index != 0) {
            this.style.borderTop = "solid rgb(240, 240, 240) 1px";
        }
        this.style.backgroundColor = "white";
        this.style.color = "black";
    }
    createElements() {
        this.shadowRoot.appendChild(this._selectAccountItemText);
        this.shadowRoot.appendChild(this._selectAccountItemImage);
    }
    runMouseOverEvent() {
        this._selectAccountItemText.runMouseOverEvent();
        this._selectAccountItemImage.runMouseOverEvent();
    }
    runMouseLeaveEvent() {
        this._selectAccountItemText.runMouseLeaveEvent();
        this._selectAccountItemImage.runMouseLeaveEvent();
    }
    close() {
        this._selectAccountList.close();
    }
    setValue() {
        this._selectAccountList.setValue(this._accountData);
    }
    getData() {
        return this._accountData;
    }
}
window.customElements.define("select-account-item", HTMLSelectAccountItemElement);
//# sourceMappingURL=HTMLSelectAccountItemElement.js.map
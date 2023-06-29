import { HTMLDeleteElement } from "./HTMLDeleteElement.js";
import { HTMLNewMailElement } from "./HTMLNewMailElement.js";
import { HTMLPinElement } from "./HTMLPinElement.js";
import { HTMLShowElement } from "./HTMLShowElement.js";
import { ToolsBase } from "./ToolsBase.js";
export class HTMLSendedMessagesToolsElement extends ToolsBase {
    constructor(toolsNavbar) {
        super(toolsNavbar);
        this._newMail = new HTMLNewMailElement(this);
        this._pin = new HTMLPinElement(this);
        this._delete = new HTMLDeleteElement(this);
        this._show = new HTMLShowElement(this);
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
        this.shadowRoot.appendChild(this._newMail);
        this.shadowRoot.appendChild(this._pin);
        this.shadowRoot.appendChild(this._delete);
        this.shadowRoot.appendChild(this._show);
        this._pin.setEnabality(false);
        this._delete.setEnabality(false);
        this._show.setEnabality(false);
    }
    getPinEnability() {
        return this._pin.getEnabality();
    }
    setPinEnability(value) {
        this._pin.setEnabality(value);
    }
    setPinFunction(functionName) {
        this._pin.setFunction(functionName);
    }
    getDeleteEnability() {
        return this._delete.getEnabality();
    }
    setDeleteEnability(value) {
        this._delete.setEnabality(value);
    }
    setDeleteFunction(functionName) {
        this._delete.setFunction(functionName);
    }
    getShowEnability() {
        return this._show.getEnabality();
    }
    setShowEnability(value) {
        this._show.setEnabality(value);
    }
    setShowFunction(functionName) {
        this._show.setFunction(functionName);
    }
}
window.customElements.define("sended-messages-tools", HTMLSendedMessagesToolsElement);
//# sourceMappingURL=HTMLSendedMessagesToolsElement.js.map
import { HTMLDeleteElement } from "./HTMLDeleteElement.js";
import { HTMLMarkAsReadElement } from "./HTMLMarkAsReadElement.js";
import { HTMLNewMailElement } from "./HTMLNewMailElement.js";
import { HTMLPinElement } from "./HTMLPinElement.js";
import { HTMLReplyElement } from "./HTMLReplyElement.js";
import { HTMLShowElement } from "./HTMLShowElement.js";
import { ToolsBase } from "./ToolsBase.js";
export class HTMLReceivedMessagesToolsElement extends ToolsBase {
    constructor(toolsNavbar) {
        super(toolsNavbar);
        this._newMail = new HTMLNewMailElement(this);
        this._markAsRead = new HTMLMarkAsReadElement(this);
        this._pin = new HTMLPinElement(this);
        this._delete = new HTMLDeleteElement(this);
        this._reply = new HTMLReplyElement(this);
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
        this.shadowRoot.appendChild(this._markAsRead);
        this.shadowRoot.appendChild(this._pin);
        this.shadowRoot.appendChild(this._delete);
        this.shadowRoot.appendChild(this._reply);
        this.shadowRoot.appendChild(this._show);
        this._markAsRead.setEnabality(false);
        this._pin.setEnabality(false);
        this._delete.setEnabality(false);
        this._reply.setEnabality(false);
        this._show.setEnabality(false);
    }
    getMarkAsReadEnability() {
        return this._markAsRead.getEnabality();
    }
    setMarkAsReadEnability(value) {
        this._markAsRead.setEnabality(value);
    }
    setMarkAsReadFunction(functionName) {
        this._markAsRead.setFunction(functionName);
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
    getReplyEnability() {
        return this._reply.getEnabality();
    }
    setReplyEnability(value) {
        this._reply.setEnabality(value);
    }
    setReplyFunction(functionName) {
        this._reply.setFunction(functionName);
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
window.customElements.define("received-messages-tools", HTMLReceivedMessagesToolsElement);
//# sourceMappingURL=HTMLReceivedMessagesToolsElement.js.map
import { HTMLMessageDateTimeElement } from "./HTMLMessageDateTimeElement.js";
import { HTMLMessageTitleElement } from "./HTMLMessageTitleElement.js";
export class HTMLMessageTitleBoxElement extends HTMLElement {
    constructor(message, title, date) {
        super();
        this.attachShadow({ mode: 'open' });
        this._message = message;
        this._messageTitle = new HTMLMessageTitleElement(this, title);
        this._messageDate = new HTMLMessageDateTimeElement(this, date);
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "relative";
        this.style.display = "block";
        this.style.overflow = "hidden";
        this.style.padding = "0px 15px";
    }
    createElements() {
        this.shadowRoot.appendChild(this._messageTitle);
        this.shadowRoot.appendChild(this._messageDate);
    }
}
window.customElements.define("message-title-box", HTMLMessageTitleBoxElement);
//# sourceMappingURL=HTMLMessageTitleBoxElement.js.map
import { HTMLMessageFileElement } from "./HTMLMessageFileElement.js";
import { HTMLMessageLineElement } from "./HTMLMessageLineElement.js";
import { HTMLMessageTextElement } from "./HTMLMessageTextElement.js";
import { HTMLMessageTitleBoxElement } from "./HTMLMessageTitleBoxElement.js";
export class HTMLMessageElement extends HTMLElement {
    constructor(messageDisplayer, messageData) {
        super();
        this.attachShadow({ mode: 'open' });
        this._messageDisplayer = messageDisplayer;
        this._messageData = messageData;
        this._messageTitle = new HTMLMessageTitleBoxElement(this, this._messageData.title, this._messageData.dateTime);
        this._messageLine = new HTMLMessageLineElement(this, this._messageData.isSenderMe);
        this._messageText = new HTMLMessageTextElement(this, this._messageData.text);
        this._messageFile = new HTMLMessageFileElement(this, this._messageData.fileId, this._messageData.fileName, this._messageData.isSenderMe);
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
        this.style.width = "51%";
        this.style.marginBottom = "20px";
        this.style.borderBottomLeftRadius = "15px";
        this.style.borderBottomRightRadius = "15px";
        this.style.padding = "15px 20px";
        this.style.fontFamily = "system-ui";
        if (this._messageData.isSenderMe) {
            this.style.float = "left";
            this.style.color = "black";
            this.style.backgroundColor = "rgb(240, 240, 240)";
            this.style.borderTopRightRadius = "15px";
        }
        else {
            this.style.float = "right";
            this.style.color = "white";
            this.style.backgroundColor = "rgb(15, 108, 189)";
            this.style.borderTopLeftRadius = "15px";
        }
    }
    createElements() {
        this.shadowRoot.appendChild(this._messageTitle);
        this.shadowRoot.appendChild(this._messageLine);
        this.shadowRoot.appendChild(this._messageText);
        this.shadowRoot.appendChild(this._messageFile);
    }
}
window.customElements.define("web-message", HTMLMessageElement);
//# sourceMappingURL=HTMLMessageElement.js.map
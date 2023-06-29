import { HTMLMessageDisplayerElement } from "./HTMLMessageDisplayerElement.js";
import { HTMLMessageFileElement } from "./HTMLMessageFileElement.js";
import { HTMLMessageLineElement } from "./HTMLMessageLineElement.js";
import { HTMLMessageTextElement } from "./HTMLMessageTextElement.js";
import { HTMLMessageTitleBoxElement } from "./HTMLMessageTitleBoxElement.js";
import { MessageData } from "./MessageData.js";

export class HTMLMessageElement extends HTMLElement {

    private readonly _messageDisplayer: HTMLMessageDisplayerElement;
    private readonly _messageData: MessageData;
    private readonly _messageTitle: HTMLMessageTitleBoxElement;
    private readonly _messageLine: HTMLMessageLineElement;
    private readonly _messageText: HTMLMessageTextElement;
    private readonly _messageFile: HTMLMessageFileElement;

    constructor(messageDisplayer: HTMLMessageDisplayerElement, messageData: MessageData) {
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

    private setElement(): void {
        this.setStyle();
        this.createElements();
    }

    private setStyle(): void {
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

    private createElements(): void {
        this.shadowRoot.appendChild(this._messageTitle);
        this.shadowRoot.appendChild(this._messageLine);
        this.shadowRoot.appendChild(this._messageText);
        this.shadowRoot.appendChild(this._messageFile);
    }

}

window.customElements.define("web-message", HTMLMessageElement);

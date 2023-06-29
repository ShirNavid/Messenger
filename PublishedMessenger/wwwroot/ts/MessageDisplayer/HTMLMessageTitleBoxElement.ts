import { HTMLMessageDateTimeElement } from "./HTMLMessageDateTimeElement.js";
import { HTMLMessageElement } from "./HTMLMessageElement.js";
import { HTMLMessageTitleElement } from "./HTMLMessageTitleElement.js";

export class HTMLMessageTitleBoxElement extends HTMLElement {

    private readonly _message: HTMLMessageElement;
    private readonly _messageTitle: HTMLMessageTitleElement;
    private readonly _messageDate: HTMLMessageDateTimeElement;

    constructor(message: HTMLMessageElement, title: string, date: string) {
        super();

        this.attachShadow({ mode: 'open' });

        this._message = message;
        this._messageTitle = new HTMLMessageTitleElement(this, title);
        this._messageDate = new HTMLMessageDateTimeElement(this, date);

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
        this.style.padding = "0px 15px";
    }

    private createElements(): void {
        this.shadowRoot.appendChild(this._messageTitle);
        this.shadowRoot.appendChild(this._messageDate);
    }

}

window.customElements.define("message-title-box", HTMLMessageTitleBoxElement);
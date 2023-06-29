import { HTMLMessageSendElement } from "./HTMLMessageSendElement.js";

export class HTMLMessageSendTextElement extends HTMLElement {

    private readonly _send: HTMLMessageSendElement;

    constructor(send: HTMLMessageSendElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._send = send;

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
    }

    private setStyle(): void {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.top = "2px";
        this.style.left = "19px";
        this.style.height = "16px";
        this.style.width = "61px";
        this.style.fontSize = "14px";
        this.style.userSelect = "none";
    }

    private createElements(): void {
        this.shadowRoot.innerHTML = "Send mail";
    }

}

window.customElements.define("message-send-text", HTMLMessageSendTextElement);

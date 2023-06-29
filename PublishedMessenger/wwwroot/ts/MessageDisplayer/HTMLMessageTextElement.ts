import { HTMLMessageElement } from "./HTMLMessageElement.js";

export class HTMLMessageTextElement extends HTMLElement {

    private readonly _message: HTMLMessageElement;
    private readonly _text: string;

    constructor(message: HTMLMessageElement, text: string) {
        super();

        this.attachShadow({ mode: 'open' });

        this._message = message;
        this._text = text;

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
        this.shadowRoot.innerHTML = this._text;
    }

}

window.customElements.define("message-text", HTMLMessageTextElement);

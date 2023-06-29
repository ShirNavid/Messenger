import { HTMLReplyElement } from "./HTMLReplyElement.js";

export class HTMLReplyTextElement extends HTMLElement {

    private readonly _reply: HTMLReplyElement;

    constructor(reply: HTMLReplyElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._reply = reply;

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
    }

    private setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "21px";
        this.style.top = "6px";
        this.style.left = "36px";
        this.style.fontSize = "14px";
        this.style.userSelect = "none";
    }

    private createElements(): void {
        this.shadowRoot.innerHTML = "Reply";
    }

    public setEnabality(value: boolean): void {
        this.style.color = value ? "black" : "#C3C3C3";
    }

}

window.customElements.define("reply-text", HTMLReplyTextElement);

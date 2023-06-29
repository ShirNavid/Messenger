import { HTMLMarkAsReadElement } from "./HTMLMarkAsReadElement.js";

export class HTMLMarkAsReadTextElement extends HTMLElement {

    private readonly _markAsRead: HTMLMarkAsReadElement;

    constructor(markAsRead: HTMLMarkAsReadElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._markAsRead = markAsRead;

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
        this.style.height = "21px";
        this.style.top = "6px";
        this.style.left = "10px";
        this.style.fontSize = "14px";
        this.style.userSelect = "none";
    }

    private createElements(): void {
        this.shadowRoot.innerHTML = "Mark as read";
    }

    public setEnablility(value: boolean): void {
        this.style.color = value ? "black" : "#C3C3C3";
    }

}

window.customElements.define("mark-as-read-text", HTMLMarkAsReadTextElement);

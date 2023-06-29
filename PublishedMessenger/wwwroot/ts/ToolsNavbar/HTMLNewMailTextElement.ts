import { HTMLNewMailElement } from "./HTMLNewMailElement.js";

export class HTMLNewMailTextElement extends HTMLElement {

    private readonly _newMail: HTMLNewMailElement;

    constructor(newMail: HTMLNewMailElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._newMail = newMail;

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
        this.style.left = "22px";
        this.style.height = "16px";
        this.style.width = "61px";
        this.style.fontSize = "14px";
        this.style.userSelect = "none";
    }

    private createElements(): void {
        this.shadowRoot.innerHTML = "New mail";
    }

}

window.customElements.define("new-mail-text", HTMLNewMailTextElement);

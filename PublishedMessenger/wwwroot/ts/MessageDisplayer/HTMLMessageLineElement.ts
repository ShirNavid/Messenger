import { HTMLMessageElement } from "./HTMLMessageElement.js";

export class HTMLMessageLineElement extends HTMLElement {

    private readonly _message: HTMLMessageElement;
    private readonly _isSenderMe: boolean;

    constructor(message: HTMLMessageElement, isSenderMe: boolean) {
        super();

        this.attachShadow({ mode: 'open' });

        this._message = message;
        this._isSenderMe = isSenderMe;

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
    }

    private setStyle(): void {
        this.style.position = "relative";
        this.style.display = "block";
        this.style.width = "100%";
        this.style.margin = "10px 0px";
        this.style.height = "1px";
        this.style.backgroundColor = (this._isSenderMe) ? "rgb(220, 220, 220)" : "rgb(15, 84, 140)";
    }

    private createElements(): void {

    }

}

window.customElements.define("message-line", HTMLMessageLineElement);
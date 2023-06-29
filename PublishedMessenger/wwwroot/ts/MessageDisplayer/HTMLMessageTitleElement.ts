import { HTMLMessageTitleBoxElement } from "./HTMLMessageTitleBoxElement.js";

export class HTMLMessageTitleElement extends HTMLElement {

    private readonly _messageTitleBox: HTMLMessageTitleBoxElement;
    private readonly _title: string;

    constructor(messageTitleBox: HTMLMessageTitleBoxElement, title: string) {
        super();

        this.attachShadow({ mode: 'open' });

        this._messageTitleBox = messageTitleBox;
        this._title = title;

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
    }

    private setStyle(): void {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.boxSizing = "border-box";
        this.style.width = "calc(100% - 130px)";
        this.style.fontFamily = "system-ui";
    }

    private createElements(): void {
        this.shadowRoot.innerHTML = this._title;
    }

}

window.customElements.define("message-title", HTMLMessageTitleElement);
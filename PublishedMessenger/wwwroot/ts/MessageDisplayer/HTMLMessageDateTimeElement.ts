import { HTMLMessageTitleBoxElement } from "./HTMLMessageTitleBoxElement.js";

export class HTMLMessageDateTimeElement extends HTMLElement {

    private readonly _date: string;

    constructor(titleBox: HTMLMessageTitleBoxElement, date: string) {
        super();

        this.attachShadow({ mode: 'open' });

        this._date = date;

        this.setElement();
    }

    private setElement() {
        this.setStyle();
        this.createElements();
    }

    private setStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.width = "130px";
        this.style.boxSizing = "border-box";
        this.style.fontFamily = "system-ui";
    }

    private createElements() {
        this.shadowRoot.innerHTML = this._date;
    }

}

window.customElements.define("message-date-time", HTMLMessageDateTimeElement);

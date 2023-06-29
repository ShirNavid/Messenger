﻿import { HTMLDateAndTimeElement } from "./HTMLDateAndTimeElement.js";

export class HTMLMessageDateElement extends HTMLElement {

    private readonly _dateAndTime: HTMLDateAndTimeElement;

    constructor(dateAndTime: HTMLDateAndTimeElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._dateAndTime = dateAndTime;

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
        this.style.right = "9px";

        const style = document.createElement("style");
        style.innerHTML =
            "input[type='date'] {" +
            "    border-radius: 25px;" +
            "    outline: none;" +
            "    border: solid #e5e5e5 1px;" +
            "    font-family: system-ui;" +
            "    padding: 5px 0px 5px 38px;" +
            "}" +
            "input[type='date']::-webkit-calendar-picker-indicator {" +
            "    position: absolute;" +
            "    color: red;" +
            "    display: inline-block;" +
            "    left: 16px;" +
            "    top: 8px;" +
            "    opacity: 0.3;" +
            "}" +
            "";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        const input = document.createElement("input");
        input.type = "date";
        this.shadowRoot.appendChild(input);
    }

    public getValue(): string {
        const input = this.shadowRoot.querySelector("input");
        const value = input.value;
        return value;
    }

    public setNull(): void {
        const input = this.shadowRoot.querySelector("input");
        input.value = null;
    }

}

window.customElements.define("message-date", HTMLMessageDateElement);


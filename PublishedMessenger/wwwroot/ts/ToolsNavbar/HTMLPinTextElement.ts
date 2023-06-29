import { HTMLPinElement } from "./HTMLPinElement.js";

export class HTMLPinTextElement extends HTMLElement {

    private readonly _pin: HTMLPinElement;

    constructor(pin: HTMLPinElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._pin = pin;

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
        this.style.top = "5px";
        this.style.left = "5px";
        this.style.fontSize = "14px";
        this.style.color = "black";
        this.style.userSelect = "none";
    }

    private createElements(): void {
        this.shadowRoot.innerHTML = "Pin";
    }

    public setEnablility(value: boolean): void {
        this.style.color = value ? "black" : "#C3C3C3";
    }

}

window.customElements.define("pin-text", HTMLPinTextElement);


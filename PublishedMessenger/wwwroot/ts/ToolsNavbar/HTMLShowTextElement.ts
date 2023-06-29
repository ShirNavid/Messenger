import { HTMLShowElement } from "./HTMLShowElement.js";

export class HTMLShowTextElement extends HTMLElement {

    private readonly _show: HTMLShowElement;

    constructor(show: HTMLShowElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._show = show;

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements()
    }

    private setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "21px";
        this.style.top = "5px";
        this.style.left = "35px";
        this.style.fontSize = "14px";
        this.style.color = "black";
        this.style.userSelect = "none";
    }

    private createElements(): void {
        this.shadowRoot.innerHTML = "Show";
    }

    public setEnabality(value: boolean): void {
        this.style.color = value ? "black" : "#C3C3C3";
    }

}

window.customElements.define("show-text", HTMLShowTextElement);
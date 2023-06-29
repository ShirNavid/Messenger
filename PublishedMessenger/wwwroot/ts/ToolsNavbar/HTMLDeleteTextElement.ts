import { HTMLDeleteElement } from "./HTMLDeleteElement.js";

export class HTMLDeleteTextElement extends HTMLElement {

    private readonly _delete: HTMLDeleteElement;

    constructor(deleteElement: HTMLDeleteElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._delete = deleteElement;

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
        this.style.userSelect = "none";
    }

    private createElements(): void {
        this.shadowRoot.innerHTML = "Delete";
    }

    public setEnablility(value: boolean): void {
        this.style.color = value ? "black" : "#C3C3C3";
    }

}

window.customElements.define("delete-text", HTMLDeleteTextElement);


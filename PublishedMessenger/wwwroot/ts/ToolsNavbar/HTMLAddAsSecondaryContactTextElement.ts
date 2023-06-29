import { HTMLAddAsSecondaryContactElement } from "./HTMLAddAsSecondaryContactElement.js";

export class HTMLAddAsSecondaryContactTextElement extends HTMLElement {

    private readonly _addAsSecondaryContact: HTMLAddAsSecondaryContactElement;

    constructor(addAsSecondaryContact: HTMLAddAsSecondaryContactElement) {
        super();

        this.attachShadow({ mode: "open" });

        this._addAsSecondaryContact = addAsSecondaryContact;

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
        this.style.userSelect = "none";
        this.style.top = "5px";
        this.style.left = "37px";

        const style = document.createElement("style");
        style.innerHTML =
            "text {" +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    font-size: 14px;" +
            "}" +
            "";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        const text = document.createElement("text");
        text.innerHTML = "Add as secondary contact";
        this.shadowRoot.appendChild(text);
    }

    public setEnabality(value: boolean): void {
        this.style.color = value ? "black" : "#C3C3C3";
    }

}

window.customElements.define("add-as-secondary-contact-text", HTMLAddAsSecondaryContactTextElement)


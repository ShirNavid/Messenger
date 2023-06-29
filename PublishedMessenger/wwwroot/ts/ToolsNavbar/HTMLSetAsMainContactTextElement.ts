import { HTMLSetAsMainContactElement } from "./HTMLSetAsMainContactElement.js";

export class HTMLSetAsMainContactTextElement extends HTMLElement {

    private readonly _setAsMainContact: HTMLSetAsMainContactElement;

    constructor(setAsMainContact: HTMLSetAsMainContactElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._setAsMainContact = setAsMainContact;

        this.setElements();
    }

    private setElements(): void {
        this.setStyle();
        this.createElements();
    }

    private setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.userSelect = "none";
        this.style.top = "6px";
        this.style.left = "35px";

        const style = document.createElement("style");
        style.innerHTML =
            "text {" +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    font-size: 14px;" +
            "}" +
            ";"
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        const text = document.createElement("text");
        text.innerHTML = "Set as main contact";
        this.shadowRoot.appendChild(text);
    }

    public setEnabality(value: boolean): void {
        this.style.color = value ? "black" : "#C3C3C3";
    }

}

window.customElements.define("set-as-main-contact-text", HTMLSetAsMainContactTextElement)

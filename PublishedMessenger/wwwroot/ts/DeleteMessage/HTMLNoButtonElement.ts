import { HTMLDeleteMessageElement } from "./HTMLDeleteMessageElement.js";

export class HTMLNoButtonElement extends HTMLElement {

    private readonly _deleteMessage: HTMLDeleteMessageElement

    constructor(deleteMessage: HTMLDeleteMessageElement) {
        super();

        this.attachShadow({ mode: "open" });

        this._deleteMessage = deleteMessage;

        this.setElement();
    }

    private setElement(): void {
        this.createStyle();
        this.createElements();
        this.setEvent();
    }

    private createStyle(): void {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.userSelect = "none";
        this.style.borderRadius = "5px";
        this.style.border = "solid white 2px";
        this.style.padding = "4px 11px";
        this.style.backgroundColor = "#727272";
    }

    private createElements(): void {
        const text = document.createElement("text");
        text.innerHTML = "No";
        this.shadowRoot.appendChild(text);
    }

    private setEvent(): void {
        this.addEventListener("mousedown", function (this: HTMLNoButtonElement) {
            this._deleteMessage.setOff();
        });
        this.addEventListener("mouseover", function (this: HTMLNoButtonElement) {
            this.style.backgroundColor = "#868686";
        });
        this.addEventListener("mouseleave", function (this: HTMLNoButtonElement) {
            this.style.backgroundColor = "#727272";
        });
}

}

window.customElements.define("no-button", HTMLNoButtonElement);
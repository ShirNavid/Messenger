import { HTMLDeleteMessageElement } from "./HTMLDeleteMessageElement.js";

export class HTMLYesButtonElement extends HTMLElement {

    private readonly _deleteMessage: HTMLDeleteMessageElement

    constructor(deleteMessage: HTMLDeleteMessageElement) {
        super();

        this._deleteMessage = deleteMessage;

        this.attachShadow({ mode: "open" });

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
        this.style.marginRight = "5px";
        this.style.marginLeft = "105px";
        this.style.backgroundColor = "#727272";
    }

    private createElements(): void {
        const text = document.createElement("text");
        text.innerHTML = "Yes";
        this.shadowRoot.appendChild(text);
    }

    private setEvent(): void {
        this.addEventListener("mousedown", function (this: HTMLYesButtonElement) {
            this._deleteMessage.runFunction();
            this._deleteMessage.setOff();
        });
        this.addEventListener("mouseover", function (this: HTMLYesButtonElement) {
            this.style.backgroundColor = "#868686";
        });
        this.addEventListener("mouseleave", function (this: HTMLYesButtonElement) {
            this.style.backgroundColor = "#727272";
        });
    }

}

window.customElements.define("yes-button", HTMLYesButtonElement);
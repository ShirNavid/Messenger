import { HTMLNoButtonElement } from "./HTMLNoButtonElement.js";
import { HTMLYesButtonElement } from "./HTMLYesButtonElement.js";

export class HTMLDeleteMessageElement extends HTMLElement {

    private _yesButton: HTMLYesButtonElement;
    private _noButton: HTMLNoButtonElement;

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    private connectedCallback(): void {
        this._yesButton = new HTMLYesButtonElement(this);
        this._noButton = new HTMLNoButtonElement(this);

        this.setElement();
    }

    private setElement(): void {
        this.createStyle();
        this.createElements();
    }

    private createStyle(): void {
        this.style.position = "fixed";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.padding = "15px";
        this.style.backgroundColor = "#727272";
        this.style.color = "white";
        this.style.bottom = "10px";
        this.style.borderRadius = "5px";

        const style = document.createElement("style");
        style.innerHTML = 
            "text {" +
            "    display: block;" +
            "    margin-bottom: 13px;" +
            "    user-select: none;" +
            "}" +
            "";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        this.classList.add("initial-off");
        const text = document.createElement("text");
        text.innerHTML = "Are U sure U want to delete this message??";
        this.shadowRoot.appendChild(text);
        this.shadowRoot.appendChild(this._yesButton);
        this.shadowRoot.appendChild(this._noButton);
    }

    public setOn(): void {
        const isInitialOff = this.classList.contains("initial-off");
        const isOff = this.classList.contains("off");
        if (isInitialOff) {
            this.classList.replace("initial-off", "on");
        }
        else if (isOff) {
            this.classList.replace("off", "on");
        }
    }

    public setOff(): void {
        this.classList.replace("on", "off");
    }

    public runFunction(): void {
        const functionText = this.getAttribute("function-text");
        eval(functionText);
    }

}

window.customElements.define("delete-message", HTMLDeleteMessageElement);
import { HTMLShowElement } from "./HTMLShowElement.js";

export class HTMLShowIconElement extends HTMLElement {

    private readonly _show: HTMLShowElement;

    constructor(show: HTMLShowElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._show = show;

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
        this.style.left = "7px";
        this.style.top = "4px";

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
        this.shadowRoot.appendChild(link);

        const style = document.createElement("style");
        style.innerHTML =
            "span {" +
            "    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;" +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    user-select: none;" +
            "}" +
            "";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        const span = document.createElement("span");
        span.classList.add("material-symbols-outlined");
        span.innerHTML = "wysiwyg";
        this.shadowRoot.appendChild(span);
    }

    public setEnabality(value: boolean): void {
        this.style.color = value ? "#38DE13" : "#C3C3C3";
    }

}

window.customElements.define("show-icon", HTMLShowIconElement);

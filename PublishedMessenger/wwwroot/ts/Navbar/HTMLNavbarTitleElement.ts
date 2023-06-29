import { HTMLNavbarElement } from "./HTMLNavbarElement.js";

export class HTMLNavbarTitleElement extends HTMLElement {

    private readonly _navbar: HTMLNavbarElement;

    constructor(navbar: HTMLNavbarElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._navbar = navbar;

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElement();
    }

    private setStyle(): void {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "48px";
        this.style.width = "100px";
        this.style.top = "0px";
        this.style.color = "#FFFFFF";
        this.style.userSelect = "none";
        this.style.cursor = "pointer";

        const style = document.createElement("style");
        style.innerHTML =
            "text {" +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    top: 13px;" +
            "    font-weight: 600;" +
            "    left: 15px;" +
            "}" +
            "";
        this.shadowRoot.appendChild(style);
    }

    private createElement(): void {
        const text = document.createElement("text");
        text.innerHTML = "Messenger";
        this.shadowRoot.appendChild(text);
    }

}

window.customElements.define("navbar-title", HTMLNavbarTitleElement)


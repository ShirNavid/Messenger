﻿import { HTMLNewMailElement } from "./HTMLNewMailElement.js";

export class HTMLNewMailIconElement extends HTMLElement {

    private readonly _newMail: HTMLNewMailElement;

    constructor(newMail: HTMLNewMailElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._newMail = newMail;

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
        this.style.height = "20px";
        this.style.width = "20px";
        this.style.top = "6px";
        this.style.left = "12px";
        this.style.userSelect = "none";

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
        this.shadowRoot.appendChild(link);

        const style = document.createElement("style");
            style.innerHTML =
            "span.material-symbols-outlined {" +
            "    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;" +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    width: 100%;" +
            "    height: 100%;" +
            "    font-size: 19px;" +
            "}" +
            "";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        const span = document.createElement("span");
        span.classList.add("material-symbols-outlined");
        span.innerHTML = "mail";

        this.shadowRoot.appendChild(span);
    }

}

window.customElements.define("new-mail-icon", HTMLNewMailIconElement);


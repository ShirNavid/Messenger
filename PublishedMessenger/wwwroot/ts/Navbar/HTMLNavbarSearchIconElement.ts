import { HTMLNavbarSearchElement } from "./HTMLNavbarSearchElement.js";

export class HTMLNavbarSearchIconElement extends HTMLElement {

    private readonly _navbarSearch: HTMLNavbarSearchElement

    constructor(navbarSearch: HTMLNavbarSearchElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._navbarSearch = navbarSearch;

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
        this.style.height = "36px";
        this.style.width = "36px";

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
            "    height: 24px;" +
            "    width: 24px;" +
            "    top: 6px;" +
            "    left: 6px;" +
            "    color: #0C3B5E;" +
            "}" +
            "";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        const span = document.createElement("span");
        span.innerHTML = "search";
        this.shadowRoot.appendChild(span);
        span.classList.add("material-symbols-outlined");
    }

}

window.customElements.define("navbar-search-icon", HTMLNavbarSearchIconElement);


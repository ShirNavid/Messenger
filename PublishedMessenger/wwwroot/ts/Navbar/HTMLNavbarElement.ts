import { HTMLNavbarAppsElement } from "./HTMLNavbarAppsElement.js";
import { HTMLNavbarSearchElement } from "./HTMLNavbarSearchElement.js";
import { HTMLNavbarTitleElement } from "./HTMLNavbarTitleElement.js";

export class HTMLNavbarElement extends HTMLElement {

    private readonly _navbarApps: HTMLNavbarAppsElement;
    private readonly _navbarTitle: HTMLNavbarTitleElement;
    private readonly _navbarSearch: HTMLNavbarSearchElement;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this._navbarApps = new HTMLNavbarAppsElement(this);
        this._navbarTitle = new HTMLNavbarTitleElement(this);
        this._navbarSearch = new HTMLNavbarSearchElement(this);

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
    }

    private setStyle(): void {
        this.style.position = "relative";
        this.style.display = "block";
        this.style.overflow = "hidden";
        this.style.height = "48px";
        this.style.width = "100%";
        this.style.backgroundColor = "#0F6CBD";
        this.style.top = "0px";

        const style = document.createElement("style");
        style.innerHTML =
            "@keyframes set-apps-on { " +
            "    from {" +
            "        background-color: transparent;" +
            "    }" +
            "    to {" +
            "        background-color: rgb(12, 59, 94);" +
            "    }" +
            "}" +
            "";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        this.shadowRoot.appendChild(this._navbarApps);
        this.shadowRoot.appendChild(this._navbarTitle);
        this.shadowRoot.appendChild(this._navbarSearch);
    }

    public setSearchFunction(searchFunctionName: string): void {
        this._navbarSearch.setSearchFunction(searchFunctionName);
    }

}

window.customElements.define("web-navbar", HTMLNavbarElement);

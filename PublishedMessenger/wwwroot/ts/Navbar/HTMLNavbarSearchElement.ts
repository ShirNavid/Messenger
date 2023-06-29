import { HTMLNavbarElement } from "./HTMLNavbarElement.js";
import { HTMLNavbarSearchIconElement } from "./HTMLNavbarSearchIconElement.js";
import { HTMLNavbarSearchInputElement } from "./HTMLNavbarSearchInputElement.js";

export class HTMLNavbarSearchElement extends HTMLElement {

    private readonly _navbar: HTMLNavbarElement;
    private readonly _navbarSearchIcon: HTMLNavbarSearchIconElement;
    private readonly _navbarSearchInput: HTMLNavbarSearchInputElement;

    constructor(navbar: HTMLNavbarElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._navbar = navbar;
        this._navbarSearchIcon = new HTMLNavbarSearchIconElement(this);
        this._navbarSearchInput = new HTMLNavbarSearchInputElement(this);

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
        this.style.width = "350px";
        this.style.top = "-6px";
        this.style.left = "127px";
        this.style.borderRadius = "5px";
        this.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    }

    private createElements(): void {
        this.shadowRoot.appendChild(this._navbarSearchIcon);
        this.shadowRoot.appendChild(this._navbarSearchInput);
    }

    public setSearchFunction(searchFunctionName: string): void  {
        this._navbarSearchInput.setSearchFunction(searchFunctionName);
    }

}

window.customElements.define("navbar-search", HTMLNavbarSearchElement);

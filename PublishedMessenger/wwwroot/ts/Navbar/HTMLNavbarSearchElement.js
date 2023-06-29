import { HTMLNavbarSearchIconElement } from "./HTMLNavbarSearchIconElement.js";
import { HTMLNavbarSearchInputElement } from "./HTMLNavbarSearchInputElement.js";
export class HTMLNavbarSearchElement extends HTMLElement {
    constructor(navbar) {
        super();
        this.attachShadow({ mode: 'open' });
        this._navbar = navbar;
        this._navbarSearchIcon = new HTMLNavbarSearchIconElement(this);
        this._navbarSearchInput = new HTMLNavbarSearchInputElement(this);
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
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
    createElements() {
        this.shadowRoot.appendChild(this._navbarSearchIcon);
        this.shadowRoot.appendChild(this._navbarSearchInput);
    }
    setSearchFunction(searchFunctionName) {
        this._navbarSearchInput.setSearchFunction(searchFunctionName);
    }
}
window.customElements.define("navbar-search", HTMLNavbarSearchElement);
//# sourceMappingURL=HTMLNavbarSearchElement.js.map
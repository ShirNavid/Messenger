import { HTMLSelectAccountElement } from "../SelectAccount/HTMLSelectAccountElement.js";
export class HTMLExtendedSelectAccountElement extends HTMLSelectAccountElement {
    constructor(toolsNavbar) {
        super();
        this._toolsNavbar = toolsNavbar;
        this.setExtendedStyle();
    }
    setExtendedStyle() {
        this.style.position = "absolute";
        this.style.top = "5px";
        this.style.right = "25px";
    }
}
window.customElements.define("extended-select-account", HTMLExtendedSelectAccountElement);
//# sourceMappingURL=HTMLExtendedSelectAccountElement.js.map
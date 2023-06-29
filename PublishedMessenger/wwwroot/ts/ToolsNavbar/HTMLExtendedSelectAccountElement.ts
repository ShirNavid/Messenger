import { HTMLSelectAccountElement } from "../SelectAccount/HTMLSelectAccountElement.js";
import { HTMLNewMessageToolsElement } from "./HTMLNewMessageToolsElement.js";
import { HTMLReplyMessageToolsElement } from "./HTMLReplyMessageToolsElement.js";

export class HTMLExtendedSelectAccountElement extends HTMLSelectAccountElement {

    private readonly _toolsNavbar: HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement;

    constructor(toolsNavbar: HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement) {
        super();

        this._toolsNavbar = toolsNavbar;

        this.setExtendedStyle();
    }

    private setExtendedStyle(): void {
        this.style.position = "absolute";
        this.style.top = "5px";
        this.style.right = "25px";
    }

}

window.customElements.define("extended-select-account", HTMLExtendedSelectAccountElement);

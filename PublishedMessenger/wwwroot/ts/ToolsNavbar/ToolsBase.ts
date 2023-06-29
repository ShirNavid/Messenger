import { HTMLToolsNavbarElement } from "./HTMLToolsNavbarElement.js";

export abstract class ToolsBase extends HTMLElement {

    protected readonly _toolsNavbar: HTMLToolsNavbarElement;

    constructor(toolsNavbar: HTMLToolsNavbarElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._toolsNavbar = toolsNavbar;
    }

}
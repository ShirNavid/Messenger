import { HTMLToolsNavbarElement } from "./HTMLToolsNavbarElement.js";
import { ToolsBase } from "./ToolsBase.js";

export class HTMLShowMessageToolsElement extends ToolsBase {

    constructor(toolsNavbar: HTMLToolsNavbarElement) {
        super(toolsNavbar);

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
    }

    private setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.top = "0px";
        this.style.left = "48px";
        this.style.height = "100%";
        this.style.width = "calc(100% - 48px)";
    }

    private createElements() {

    }

}

window.customElements.define("show-message-tools", HTMLShowMessageToolsElement);

import { ToolsBase } from "./ToolsBase.js";
export class HTMLShowMessageToolsElement extends ToolsBase {
    constructor(toolsNavbar) {
        super(toolsNavbar);
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.top = "0px";
        this.style.left = "48px";
        this.style.height = "100%";
        this.style.width = "calc(100% - 48px)";
    }
    createElements() {
    }
}
window.customElements.define("show-message-tools", HTMLShowMessageToolsElement);
//# sourceMappingURL=HTMLShowMessageToolsElement.js.map
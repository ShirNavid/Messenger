import { HTMLMessageSendIconElement } from "./HTMLMessageSendIconElement.js";
import { HTMLMessageSendTextElement } from "./HTMLMessageSendTextElement.js";
export class HTMLMessageSendElement extends HTMLElement {
    constructor(toolsNavbar) {
        super();
        this.attachShadow({ mode: 'open' });
        this._toolsNavbar = toolsNavbar;
        this._sendIcon = new HTMLMessageSendIconElement(this);
        this._sendText = new HTMLMessageSendTextElement(this);
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.backgroundColor = "#0F6CBD";
        this.style.color = "white";
        this.style.width = "110px";
        this.style.height = "32px";
        this.style.top = "4px";
        this.style.borderRadius = "5px";
        this.style.marginLeft = "4px";
    }
    createElements() {
        this.shadowRoot.appendChild(this._sendIcon);
        this.shadowRoot.appendChild(this._sendText);
    }
    setEvents() {
        this.addEventListener("mouseover", function (event) {
            this.style.backgroundColor = "rgb(15, 84, 140)";
        });
        this.addEventListener("mouseleave", function (event) {
            this.style.backgroundColor = "#0F6CBD";
        });
        this.addEventListener("mousedown", function (event) {
            eval(this._functionName + "()");
            globalThis.setPage("SendedMessages");
        });
    }
    setFunctionName(functionName) {
        this._functionName = functionName;
    }
}
window.customElements.define("message-send", HTMLMessageSendElement);
//# sourceMappingURL=HTMLMessageSendElement.js.map
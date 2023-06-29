import { HTMLAddAsSecondaryContactIconElement } from "./HTMLAddAsSecondaryContactIconElement.js";
import { HTMLAddAsSecondaryContactTextElement } from "./HTMLAddAsSecondaryContactTextElement.js";
import { HTMLNewMessageToolsElement } from "./HTMLNewMessageToolsElement.js";
import { HTMLReplyMessageToolsElement } from "./HTMLReplyMessageToolsElement.js";
export class HTMLAddAsSecondaryContactElement extends HTMLElement {
    constructor(toolsNavbar) {
        super();
        this.attachShadow({ mode: 'open' });
        this._toolsNavbar = toolsNavbar;
        this._addAsSecondaryContactIcon = new HTMLAddAsSecondaryContactIconElement(this);
        this._addAsSecondaryContactText = new HTMLAddAsSecondaryContactTextElement(this);
        this._enabality = false;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElement();
        this.setEvent();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.width = "208px";
        this.style.height = "30px";
        this.style.borderRadius = "5px";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.borderColor = "transparent";
        this.style.top = "4px";
        if (this._toolsNavbar instanceof HTMLReplyMessageToolsElement) {
            this.style.right = "340px";
        }
        if (this._toolsNavbar instanceof HTMLNewMessageToolsElement) {
            this.style.right = "512px";
        }
    }
    createElement() {
        this.shadowRoot.appendChild(this._addAsSecondaryContactIcon);
        this.shadowRoot.appendChild(this._addAsSecondaryContactText);
    }
    setEvent() {
        this.addEventListener("mouseover", function (event) {
            if (this._enabality) {
                this.style.backgroundColor = "rgb(250, 250, 250)";
                this.style.borderColor = "rgb(229, 229, 229)";
            }
        });
        this.addEventListener("mouseleave", function (event) {
            if (this._enabality) {
                this.setEnabalityStyle();
            }
        });
        this.addEventListener("mousedown", function (event) {
            if (this._enabality) {
                eval(this._functionName + "()");
                this.setEnabality(false);
            }
        });
    }
    getEnabality() {
        return this._enabality;
    }
    setEnabality(value) {
        this._enabality = value;
        this.setEnabalityStyle();
        this._addAsSecondaryContactIcon.setEnabality(value);
        this._addAsSecondaryContactText.setEnabality(value);
    }
    setFunctionName(functionName) {
        this._functionName = functionName;
    }
    setEnabalityStyle() {
        this.style.backgroundColor = "transparent";
        this.style.borderColor = "transparent";
    }
}
window.customElements.define("add-as-secondary-contact", HTMLAddAsSecondaryContactElement);
//# sourceMappingURL=HTMLAddAsSecondaryContactElement.js.map
import { HTMLPinIconElement } from "./HTMLPinIconElement.js";
import { HTMLPinTextElement } from "./HTMLPinTextElement.js";
import { HTMLSendedMessagesToolsElement } from "./HTMLSendedMessagesToolsElement.js";
export class HTMLPinElement extends HTMLElement {
    constructor(toolsNavbar) {
        super();
        this.attachShadow({ mode: 'open' });
        this._toolsNavbar = toolsNavbar;
        this._pinIcon = new HTMLPinIconElement(this);
        this._pinText = new HTMLPinTextElement(this);
        this._enabality = false;
        this._functionName = "";
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
        this.setEvent();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.top = "4px";
        this.style.width = "56px";
        this.style.height = "30px";
        this.style.borderRadius = "5px";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.borderColor = "transparent";
        if (this._toolsNavbar instanceof HTMLSendedMessagesToolsElement) {
            this.style.left = "calc(100% - 239px)";
        }
        else {
            this.style.left = "calc(100% - 323px)";
        }
    }
    createElements() {
        this.shadowRoot.appendChild(this._pinIcon);
        this.shadowRoot.appendChild(this._pinText);
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
                this.style.borderColor = "transparent";
                this.style.backgroundColor = "transparent";
            }
        });
        this.addEventListener("mousedown", function (event) {
            if (this._enabality) {
                this.style.borderColor = "transparent";
                this.style.backgroundColor = "transparent";
                eval(this._functionName + "();");
            }
        });
    }
    getEnabality() {
        return this._enabality;
    }
    setEnabality(value) {
        this._enabality = value;
        this._pinIcon.setEnablility(value);
        this._pinText.setEnablility(value);
    }
    setFunction(functionName) {
        this._functionName = functionName;
    }
}
window.customElements.define("web-pin", HTMLPinElement);
//# sourceMappingURL=HTMLPinElement.js.map
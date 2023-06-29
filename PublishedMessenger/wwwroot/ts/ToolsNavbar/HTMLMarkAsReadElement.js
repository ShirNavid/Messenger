import { HTMLMarkAsReadIconElement } from "./HTMLMarkAsReadIconElement.js";
import { HTMLMarkAsReadTextElement } from "./HTMLMarkAsReadTextElement.js";
import { HTMLSendedMessagesToolsElement } from "./HTMLSendedMessagesToolsElement.js";
export class HTMLMarkAsReadElement extends HTMLElement {
    constructor(toolsNavbar) {
        super();
        this.attachShadow({ mode: 'open' });
        this._toolsNavbar = toolsNavbar;
        this._markAsReadIcon = new HTMLMarkAsReadIconElement(this);
        this._markAsReadText = new HTMLMarkAsReadTextElement(this);
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
        this.style.width = "122px";
        this.style.height = "30px";
        this.style.borderRadius = "5px";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.borderColor = "transparent";
        if (this._toolsNavbar instanceof HTMLSendedMessagesToolsElement) {
            this.style.left = "calc(100% - 366px)";
        }
        else {
            this.style.left = "calc(100% - 450px)";
        }
    }
    createElements() {
        this.shadowRoot.appendChild(this._markAsReadIcon);
        this.shadowRoot.appendChild(this._markAsReadText);
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
        this._markAsReadIcon.setEnablility(value);
        this._markAsReadText.setEnablility(value);
    }
    setFunction(functionName) {
        this._functionName = functionName;
    }
}
window.customElements.define("mark-as-read", HTMLMarkAsReadElement);
//# sourceMappingURL=HTMLMarkAsReadElement.js.map
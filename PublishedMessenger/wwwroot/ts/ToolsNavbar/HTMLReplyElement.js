import { HTMLReplyIconElement } from "./HTMLReplyIconElement.js";
import { HTMLReplyTextElement } from "./HTMLReplyTextElement.js";
export class HTMLReplyElement extends HTMLElement {
    constructor(toolsNavbar) {
        super();
        this.attachShadow({ mode: 'open' });
        this._toolsNavbar = toolsNavbar;
        this._replyIcon = new HTMLReplyIconElement(this);
        this._replyText = new HTMLReplyTextElement(this);
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
        this.style.left = "calc(100% - 184px)";
        this.style.width = "76px";
        this.style.height = "30px";
        this.style.borderRadius = "5px";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.borderColor = "transparent";
    }
    createElements() {
        this.shadowRoot.appendChild(this._replyIcon);
        this.shadowRoot.appendChild(this._replyText);
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
        this._replyIcon.setEnabality(value);
        this._replyText.setEnabality(value);
    }
    setFunction(functionName) {
        this._functionName = functionName;
    }
}
window.customElements.define("web-reply", HTMLReplyElement);
//# sourceMappingURL=HTMLReplyElement.js.map
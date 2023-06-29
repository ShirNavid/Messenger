import { HTMLShowIconElement } from "./HTMLShowIconElement.js";
import { HTMLShowTextElement } from "./HTMLShowTextElement.js";
export class HTMLShowElement extends HTMLElement {
    constructor(toolsNavbar) {
        super();
        this.attachShadow({ mode: 'open' });
        this._toolsNavbar = toolsNavbar;
        this._showIcon = new HTMLShowIconElement(this);
        this._showText = new HTMLShowTextElement(this);
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
        this.style.left = "calc(100% - 102px)";
        this.style.width = "76px";
        this.style.height = "30px";
        this.style.borderRadius = "5px";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.borderColor = "transparent";
    }
    createElements() {
        this.shadowRoot.appendChild(this._showIcon);
        this.shadowRoot.appendChild(this._showText);
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
                eval(this._functionName + "();");
            }
        });
    }
    getEnabality() {
        return this._enabality;
    }
    setEnabality(value) {
        this._enabality = value;
        this._showIcon.setEnabality(value);
        this._showText.setEnabality(value);
    }
    setFunction(functionName) {
        this._functionName = functionName;
    }
}
window.customElements.define("web-show", HTMLShowElement);
//# sourceMappingURL=HTMLShowElement.js.map
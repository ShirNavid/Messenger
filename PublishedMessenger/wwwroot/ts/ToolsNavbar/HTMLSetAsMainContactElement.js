import { HTMLSetAsMainContactIconElement } from "./HTMLSetAsMainContactIconElement.js";
import { HTMLSetAsMainContactTextElement } from "./HTMLSetAsMainContactTextElement.js";
export class HTMLSetAsMainContactElement extends HTMLElement {
    constructor(newMessageTools) {
        super();
        this.attachShadow({ mode: 'open' });
        this._newMessageTools = newMessageTools;
        this._setAsMainContactIcon = new HTMLSetAsMainContactIconElement(this);
        this._setAsMainContactText = new HTMLSetAsMainContactTextElement(this);
        this._enabality = false;
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
        this.style.width = "167px";
        this.style.height = "30px";
        this.style.borderRadius = "5px";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.backgroundColor = "transparent";
        this.style.borderColor = "transparent";
        this.style.right = "338px";
        this.style.top = "4px";
    }
    createElements() {
        this.shadowRoot.appendChild(this._setAsMainContactIcon);
        this.shadowRoot.appendChild(this._setAsMainContactText);
    }
    setEvents() {
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
                this.style.borderColor = "transparent";
                this.style.backgroundColor = "transparent";
                eval(this._functionName + "()");
            }
        });
    }
    getEnabality() {
        return this._enabality;
    }
    setEnabality(value) {
        this._enabality = value;
        this._setAsMainContactIcon.setEnabality(value);
        this._setAsMainContactText.setEnabality(value);
        this.setEnabalityStyle();
    }
    setFunctionName(functionName) {
        this._functionName = functionName;
    }
    setEnabalityStyle() {
        this.style.backgroundColor = "transparent";
        this.style.borderColor = "transparent";
    }
}
window.customElements.define("set-as-main-contact", HTMLSetAsMainContactElement);
//# sourceMappingURL=HTMLSetAsMainContactElement.js.map
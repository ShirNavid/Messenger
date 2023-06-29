import { HTMLNewMailIconElement } from "./HTMLNewMailIconElement.js";
import { HTMLNewMailTextElement } from "./HTMLNewMailTextElement.js";
export class HTMLNewMailElement extends HTMLElement {
    constructor(toolsNavbar) {
        super();
        this.attachShadow({ mode: 'open' });
        this._toolsNavbar = toolsNavbar;
        this._newMailIcon = new HTMLNewMailIconElement(this);
        this._newMailText = new HTMLNewMailTextElement(this);
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
        this.shadowRoot.appendChild(this._newMailIcon);
        this.shadowRoot.appendChild(this._newMailText);
    }
    setEvents() {
        this.addEventListener("mouseover", function (event) {
            this.style.backgroundColor = "rgb(15, 84, 140)";
        });
        this.addEventListener("mouseleave", function (event) {
            this.style.backgroundColor = "#0F6CBD";
        });
        this.addEventListener("mousedown", function (event) {
            globalThis.setPage("NewMessage");
        });
    }
}
window.customElements.define("new-mail", HTMLNewMailElement);
//# sourceMappingURL=HTMLNewMailElement.js.map
export class HTMLPinTextElement extends HTMLElement {
    constructor(pin) {
        super();
        this.attachShadow({ mode: 'open' });
        this._pin = pin;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "21px";
        this.style.top = "5px";
        this.style.left = "5px";
        this.style.fontSize = "14px";
        this.style.color = "black";
        this.style.userSelect = "none";
    }
    createElements() {
        this.shadowRoot.innerHTML = "Pin";
    }
    setEnablility(value) {
        this.style.color = value ? "black" : "#C3C3C3";
    }
}
window.customElements.define("pin-text", HTMLPinTextElement);
//# sourceMappingURL=HTMLPinTextElement.js.map
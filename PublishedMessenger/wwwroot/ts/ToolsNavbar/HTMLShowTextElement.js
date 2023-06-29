export class HTMLShowTextElement extends HTMLElement {
    constructor(show) {
        super();
        this.attachShadow({ mode: 'open' });
        this._show = show;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "21px";
        this.style.top = "5px";
        this.style.left = "35px";
        this.style.fontSize = "14px";
        this.style.color = "black";
        this.style.userSelect = "none";
    }
    createElements() {
        this.shadowRoot.innerHTML = "Show";
    }
    setEnabality(value) {
        this.style.color = value ? "black" : "#C3C3C3";
    }
}
window.customElements.define("show-text", HTMLShowTextElement);
//# sourceMappingURL=HTMLShowTextElement.js.map
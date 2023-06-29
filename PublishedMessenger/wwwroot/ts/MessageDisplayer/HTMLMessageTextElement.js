export class HTMLMessageTextElement extends HTMLElement {
    constructor(message, text) {
        super();
        this.attachShadow({ mode: 'open' });
        this._message = message;
        this._text = text;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "relative";
        this.style.display = "block";
        this.style.overflow = "hidden";
        this.style.padding = "0px 15px";
    }
    createElements() {
        this.shadowRoot.innerHTML = this._text;
    }
}
window.customElements.define("message-text", HTMLMessageTextElement);
//# sourceMappingURL=HTMLMessageTextElement.js.map
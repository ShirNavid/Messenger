export class HTMLReplyTextElement extends HTMLElement {
    constructor(reply) {
        super();
        this.attachShadow({ mode: 'open' });
        this._reply = reply;
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
        this.style.top = "6px";
        this.style.left = "36px";
        this.style.fontSize = "14px";
        this.style.userSelect = "none";
    }
    createElements() {
        this.shadowRoot.innerHTML = "Reply";
    }
    setEnabality(value) {
        this.style.color = value ? "black" : "#C3C3C3";
    }
}
window.customElements.define("reply-text", HTMLReplyTextElement);
//# sourceMappingURL=HTMLReplyTextElement.js.map
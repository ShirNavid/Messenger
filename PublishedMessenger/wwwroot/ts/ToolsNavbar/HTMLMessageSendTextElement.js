export class HTMLMessageSendTextElement extends HTMLElement {
    constructor(send) {
        super();
        this.attachShadow({ mode: 'open' });
        this._send = send;
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
        this.style.top = "2px";
        this.style.left = "19px";
        this.style.height = "16px";
        this.style.width = "61px";
        this.style.fontSize = "14px";
        this.style.userSelect = "none";
    }
    createElements() {
        this.shadowRoot.innerHTML = "Send mail";
    }
}
window.customElements.define("message-send-text", HTMLMessageSendTextElement);
//# sourceMappingURL=HTMLMessageSendTextElement.js.map
export class HTMLNewMailTextElement extends HTMLElement {
    constructor(newMail) {
        super();
        this.attachShadow({ mode: 'open' });
        this._newMail = newMail;
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
        this.style.left = "22px";
        this.style.height = "16px";
        this.style.width = "61px";
        this.style.fontSize = "14px";
        this.style.userSelect = "none";
    }
    createElements() {
        this.shadowRoot.innerHTML = "New mail";
    }
}
window.customElements.define("new-mail-text", HTMLNewMailTextElement);
//# sourceMappingURL=HTMLNewMailTextElement.js.map
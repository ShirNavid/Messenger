export class HTMLMarkAsReadTextElement extends HTMLElement {
    constructor(markAsRead) {
        super();
        this.attachShadow({ mode: 'open' });
        this._markAsRead = markAsRead;
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
        this.style.top = "6px";
        this.style.left = "10px";
        this.style.fontSize = "14px";
        this.style.userSelect = "none";
    }
    createElements() {
        this.shadowRoot.innerHTML = "Mark as read";
    }
    setEnablility(value) {
        this.style.color = value ? "black" : "#C3C3C3";
    }
}
window.customElements.define("mark-as-read-text", HTMLMarkAsReadTextElement);
//# sourceMappingURL=HTMLMarkAsReadTextElement.js.map
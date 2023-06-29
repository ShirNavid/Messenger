export class HTMLMessageLineElement extends HTMLElement {
    constructor(message, isSenderMe) {
        super();
        this.attachShadow({ mode: 'open' });
        this._message = message;
        this._isSenderMe = isSenderMe;
        this.setElement();
    }
    setElement() {
        this.setStyle();
    }
    setStyle() {
        this.style.position = "relative";
        this.style.display = "block";
        this.style.width = "100%";
        this.style.margin = "10px 0px";
        this.style.height = "1px";
        this.style.backgroundColor = (this._isSenderMe) ? "rgb(220, 220, 220)" : "rgb(15, 84, 140)";
    }
    createElements() {
    }
}
window.customElements.define("message-line", HTMLMessageLineElement);
//# sourceMappingURL=HTMLMessageLineElement.js.map
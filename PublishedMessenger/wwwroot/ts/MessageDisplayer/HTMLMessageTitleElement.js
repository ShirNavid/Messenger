export class HTMLMessageTitleElement extends HTMLElement {
    constructor(messageTitleBox, title) {
        super();
        this.attachShadow({ mode: 'open' });
        this._messageTitleBox = messageTitleBox;
        this._title = title;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.boxSizing = "border-box";
        this.style.width = "calc(100% - 130px)";
        this.style.fontFamily = "system-ui";
    }
    createElements() {
        this.shadowRoot.innerHTML = this._title;
    }
}
window.customElements.define("message-title", HTMLMessageTitleElement);
//# sourceMappingURL=HTMLMessageTitleElement.js.map
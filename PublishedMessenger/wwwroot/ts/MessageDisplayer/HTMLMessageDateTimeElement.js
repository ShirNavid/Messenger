export class HTMLMessageDateTimeElement extends HTMLElement {
    constructor(titleBox, date) {
        super();
        this.attachShadow({ mode: 'open' });
        this._date = date;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.width = "130px";
        this.style.boxSizing = "border-box";
        this.style.fontFamily = "system-ui";
    }
    createElements() {
        this.shadowRoot.innerHTML = this._date;
    }
}
window.customElements.define("message-date-time", HTMLMessageDateTimeElement);
//# sourceMappingURL=HTMLMessageDateTimeElement.js.map
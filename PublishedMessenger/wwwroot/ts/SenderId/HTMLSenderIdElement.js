export class HTMLSenderIdElement extends HTMLElement {
    constructor() {
        super();
        this.setStyle();
    }
    setStyle() {
        this.style.display = "none";
    }
}
window.customElements.define("sender-id", HTMLSenderIdElement);
//# sourceMappingURL=HTMLSenderIdElement.js.map
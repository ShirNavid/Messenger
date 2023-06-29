export class HTMLMainReceiverIdElement extends HTMLElement {
    constructor() {
        super();
        this.setStyle();
    }
    setStyle() {
        this.style.display = "none";
    }
}
window.customElements.define("main-receiver-id", HTMLMainReceiverIdElement);
//# sourceMappingURL=HTMLMainReceiverIdElement.js.map
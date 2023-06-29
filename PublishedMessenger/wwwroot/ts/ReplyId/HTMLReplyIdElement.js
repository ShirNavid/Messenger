export class HTMLReplyIdElement extends HTMLElement {
    constructor() {
        super();
        this.setStyle();
    }
    setStyle() {
        this.style.display = "none";
    }
}
window.customElements.define("reply-id", HTMLReplyIdElement);
//# sourceMappingURL=HTMLReplyIdElement.js.map
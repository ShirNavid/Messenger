export class HTMLNotificationTextElement extends HTMLElement {
    constructor(notification, senderName) {
        super();
        this.attachShadow({ mode: 'open' });
        this._notification = notification;
        this._senderName = senderName;
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
        this.style.left = "0px";
        this.style.width = "calc(100% - 60px)";
        this.style.height = "100%";
        this.style.padding = "8px 10px 12px 10px";
        this.style.boxSizing = "border-box";
        this.style.userSelect = "none";
        this.style.backgroundColor = "#3d3d3d";
        this.style.color = "white";
    }
    createElements() {
        this.shadowRoot.innerHTML = "You have a message from: " + this._senderName;
    }
}
window.customElements.define("notification-text", HTMLNotificationTextElement);
//# sourceMappingURL=HTMLNotificationTextElement.js.map
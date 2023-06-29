import { HTMLNotificationCloseElement } from "./HTMLNotificationCloseElement.js";
import { HTMLNotificationTextElement } from "./HTMLNotificationTextElement.js";
export class HTMLNotificationElement extends HTMLElement {
    constructor(data) {
        super();
        this.attachShadow({ mode: 'open' });
        this._data = data;
        this._close = new HTMLNotificationCloseElement(this);
        this._text = new HTMLNotificationTextElement(this, this._data.senderName);
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "fixed";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.right = "40px";
        this.style.bottom = "40px";
        this.style.width = "270px";
        this.style.height = "60px";
        this.style.backgroundColor = "red";
        this.style.zIndex = "100";
    }
    createElements() {
        this.shadowRoot.appendChild(this._close);
        this.shadowRoot.appendChild(this._text);
    }
    close() {
        this.classList.add("disappear");
        const _this = this;
        const notificationRemoval = function () {
            _this.remove();
        };
        setTimeout(notificationRemoval, 300);
    }
}
window.customElements.define("web-notification", HTMLNotificationElement);
//# sourceMappingURL=HTMLNotificationElement.js.map
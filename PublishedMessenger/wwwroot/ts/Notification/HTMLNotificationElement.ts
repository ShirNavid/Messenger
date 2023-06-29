import { HTMLNotificationCloseElement } from "./HTMLNotificationCloseElement.js";
import { HTMLNotificationTextElement } from "./HTMLNotificationTextElement.js";
import { NotificationData } from "./NotificationData.js";

export class HTMLNotificationElement extends HTMLElement {

    private readonly _data: NotificationData;
    private readonly _text: HTMLNotificationTextElement;
    private readonly _close: HTMLNotificationCloseElement;

    constructor(data: NotificationData) {
        super();

        this.attachShadow({ mode: 'open' });

        this._data = data
        this._close = new HTMLNotificationCloseElement(this);
        this._text = new HTMLNotificationTextElement(this, this._data.senderName);

        this.setElement()
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
    }

    private setStyle(): void {
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

    private createElements(): void {
        this.shadowRoot.appendChild(this._close);
        this.shadowRoot.appendChild(this._text);
    }

    public close(): void {
        this.classList.add("disappear");
        const _this = this;
        const notificationRemoval = function () {
            _this.remove();
        }
        setTimeout(notificationRemoval, 300);
    }
}

window.customElements.define("web-notification", HTMLNotificationElement); 

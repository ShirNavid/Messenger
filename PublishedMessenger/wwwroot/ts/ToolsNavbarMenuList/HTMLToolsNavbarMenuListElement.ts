import { HTMLNewMessageItemElement } from "./HTMLNewMessageItemElement.js";
import { HTMLReceivedMessagesItemElement } from "./HTMLReceivedMessagesItemElement.js";
import { HTMLSendedMessagesItemElement } from "./HTMLSendedMessagesItemElement.js";

export class HTMLToolsNavbarMenuListElement extends HTMLElement {

    private readonly _receivedMessages: HTMLReceivedMessagesItemElement;
    private readonly _sendedMessages: HTMLSendedMessagesItemElement;
    private readonly _newMessage: HTMLNewMessageItemElement;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this._receivedMessages = new HTMLReceivedMessagesItemElement(this);
        this._sendedMessages = new HTMLSendedMessagesItemElement(this);
        this._newMessage = new HTMLNewMessageItemElement(this);

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
    }

    private setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.backgroundColor = "#4c4c4c";
        this.style.height = "calc(100% - 92px)";
        this.style.borderRadius = "5px";
        this.style.top = "65px";
        this.style.left = "3%";

        const style = document.createElement("style");
        style.innerHTML =
            "" +
            "" +
            "";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        this.shadowRoot.appendChild(this._receivedMessages);
        this.shadowRoot.appendChild(this._sendedMessages);
        this.shadowRoot.appendChild(this._newMessage);

        this.classList.add("initial-class");
    }

    public setStatus(value: boolean): void {
        if (value) {
            if (this.classList.contains("initial-class")) {
                this.classList.remove("initial-class");
            }
            if (this.classList.contains("disappearing")) {
                this.classList.remove("disappearing");
            }
            this.classList.add("appearing");
        }
        else {
            this.classList.add("disappearing");
            if (this.classList.contains("appearing")) {
                this.classList.remove("appearing");
            }
        }

        this._receivedMessages.setStatus(value);
        this._sendedMessages.setStatus(value);
        this._newMessage.setStatus(value);
    }

    public setItemSelected(text: string): void {
        const isOpened = this.classList.contains("appearing");
        if (this._receivedMessages.getText() == text) {
            this._receivedMessages.setValue(isOpened, true);
            this._sendedMessages.setValue(isOpened, false);
            this._newMessage.setValue(isOpened, false);
        }
        else if (this._sendedMessages.getText() == text) {
            this._receivedMessages.setValue(isOpened, false);
            this._sendedMessages.setValue(isOpened, true);
            this._newMessage.setValue(isOpened, false);
        }
        else if (this._newMessage.getText() == text) {
            this._receivedMessages.setValue(isOpened, false);
            this._sendedMessages.setValue(isOpened, false);
            this._newMessage.setValue(isOpened, true);
        }
        else {
            this._receivedMessages.setValue(isOpened, false);
            this._sendedMessages.setValue(isOpened, false);
            this._newMessage.setValue(isOpened, false);
        }
    }

}

window.customElements.define("tools-navbar-menu-list", HTMLToolsNavbarMenuListElement)

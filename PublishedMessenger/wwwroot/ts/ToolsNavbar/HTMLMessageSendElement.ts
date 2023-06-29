import { HTMLNewMessageToolsElement } from "./HTMLNewMessageToolsElement.js";
import { HTMLMessageSendIconElement } from "./HTMLMessageSendIconElement.js";
import { HTMLMessageSendTextElement } from "./HTMLMessageSendTextElement.js";
import { HTMLReplyMessageToolsElement } from "./HTMLReplyMessageToolsElement.js";

export class HTMLMessageSendElement extends HTMLElement {

    private readonly _toolsNavbar: HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement;
    private readonly _sendIcon: HTMLMessageSendIconElement;
    private readonly _sendText: HTMLMessageSendTextElement;

    private _functionName: string;

    constructor(toolsNavbar: HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._toolsNavbar = toolsNavbar;

        this._sendIcon = new HTMLMessageSendIconElement(this);
        this._sendText = new HTMLMessageSendTextElement(this);

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }

    private setStyle():void {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.backgroundColor = "#0F6CBD";
        this.style.color = "white";
        this.style.width = "110px";
        this.style.height = "32px";
        this.style.top = "4px";
        this.style.borderRadius = "5px";
        this.style.marginLeft = "4px";
    }

    private createElements(): void {
        this.shadowRoot.appendChild(this._sendIcon);
        this.shadowRoot.appendChild(this._sendText);
    }

    private setEvents(): void {
        this.addEventListener("mouseover", function (this: HTMLMessageSendElement, event: MouseEvent) {
            this.style.backgroundColor = "rgb(15, 84, 140)";
        });

        this.addEventListener("mouseleave", function (this: HTMLMessageSendElement, event: MouseEvent) {
            this.style.backgroundColor = "#0F6CBD";
        });

        this.addEventListener("mousedown", function (this: HTMLMessageSendElement, event: MouseEvent) {
            eval(this._functionName + "()");
            globalThis.setPage("SendedMessages");
        });
    }

    public setFunctionName(functionName): void {
        this._functionName = functionName;
    }

}

window.customElements.define("message-send", HTMLMessageSendElement);


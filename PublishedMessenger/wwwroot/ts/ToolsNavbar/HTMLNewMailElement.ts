import { HTMLNewMailIconElement } from "./HTMLNewMailIconElement.js";
import { HTMLNewMailTextElement } from "./HTMLNewMailTextElement.js";
import { HTMLReceivedMessagesToolsElement } from "./HTMLReceivedMessagesToolsElement.js";
import { HTMLSendedMessagesToolsElement } from "./HTMLSendedMessagesToolsElement.js";

export class HTMLNewMailElement extends HTMLElement {

    private readonly _toolsNavbar: HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement;
    private readonly _newMailIcon: HTMLNewMailIconElement;
    private readonly _newMailText: HTMLNewMailTextElement;

    constructor(toolsNavbar: HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._toolsNavbar = toolsNavbar;

        this._newMailIcon = new HTMLNewMailIconElement(this);
        this._newMailText = new HTMLNewMailTextElement(this);

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }

    private setStyle(): void {
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
        this.shadowRoot.appendChild(this._newMailIcon);
        this.shadowRoot.appendChild(this._newMailText);
    }

    private setEvents(): void {
        this.addEventListener("mouseover", function (this: HTMLNewMailElement, event: MouseEvent) {
            this.style.backgroundColor = "rgb(15, 84, 140)";
        });

        this.addEventListener("mouseleave", function (this: HTMLNewMailElement, event: MouseEvent) {
            this.style.backgroundColor = "#0F6CBD";
        });

        this.addEventListener("mousedown", function (this: HTMLNewMailElement, event: MouseEvent) {
            globalThis.setPage("NewMessage");
        });

    }

}

window.customElements.define("new-mail", HTMLNewMailElement);



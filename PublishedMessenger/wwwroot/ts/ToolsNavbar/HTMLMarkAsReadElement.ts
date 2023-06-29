import { HTMLSendedMessagesItemElement } from "../ToolsNavbarMenuList/HTMLSendedMessagesItemElement.js";
import { HTMLMarkAsReadIconElement } from "./HTMLMarkAsReadIconElement.js";
import { HTMLMarkAsReadTextElement } from "./HTMLMarkAsReadTextElement.js";
import { HTMLReceivedMessagesToolsElement } from "./HTMLReceivedMessagesToolsElement.js";
import { HTMLSendedMessagesToolsElement } from "./HTMLSendedMessagesToolsElement.js";

export class HTMLMarkAsReadElement extends HTMLElement {

    private readonly _toolsNavbar: HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement;
    private readonly _markAsReadIcon: HTMLMarkAsReadIconElement;
    private readonly _markAsReadText: HTMLMarkAsReadTextElement;

    private _enabality: boolean;
    private _functionName: string;

    constructor(toolsNavbar: HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._toolsNavbar = toolsNavbar;

        this._markAsReadIcon = new HTMLMarkAsReadIconElement(this);
        this._markAsReadText = new HTMLMarkAsReadTextElement(this);

        this._enabality = false;
        this._functionName = "";

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
        this.setEvent();
    }

    private setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.top = "4px";
        this.style.width = "122px";
        this.style.height = "30px";
        this.style.borderRadius = "5px";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.borderColor = "transparent";
        if (this._toolsNavbar instanceof HTMLSendedMessagesToolsElement) {
            this.style.left = "calc(100% - 366px)";
        }
        else {
            this.style.left = "calc(100% - 450px)";
        }
    }

    private createElements(): void {
        this.shadowRoot.appendChild(this._markAsReadIcon);
        this.shadowRoot.appendChild(this._markAsReadText);
    }

    private setEvent(): void {
        this.addEventListener("mouseover", function (this: HTMLMarkAsReadElement, event: MouseEvent) {
            if (this._enabality) {
                this.style.backgroundColor = "rgb(250, 250, 250)";
                this.style.borderColor = "rgb(229, 229, 229)";
            }
        });

        this.addEventListener("mouseleave", function (this: HTMLMarkAsReadElement, event: MouseEvent) {
            if (this._enabality) {
                this.style.borderColor = "transparent";
                this.style.backgroundColor = "transparent";
            }
        });

        this.addEventListener("mousedown", function (this: HTMLMarkAsReadElement, event: MouseEvent) {
            if (this._enabality) {
                this.style.borderColor = "transparent";
                this.style.backgroundColor = "transparent";
                eval(this._functionName + "();");
            }
        });
    }

    public getEnabality(): boolean {
        return this._enabality;
    }

    public setEnabality(value: boolean): void {
        this._enabality = value;
        this._markAsReadIcon.setEnablility(value);
        this._markAsReadText.setEnablility(value);
    }

    public setFunction(functionName: string): void {
        this._functionName = functionName;
    }

}

window.customElements.define("mark-as-read", HTMLMarkAsReadElement);



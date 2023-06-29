import { HTMLDeleteIconElement } from "./HTMLDeleteIconElement.js";
import { HTMLDeleteTextElement } from "./HTMLDeleteTextElement.js";
import { HTMLReceivedMessagesToolsElement } from "./HTMLReceivedMessagesToolsElement.js";
import { HTMLSendedMessagesToolsElement } from "./HTMLSendedMessagesToolsElement.js";

export class HTMLDeleteElement extends HTMLElement {

    private readonly _toolsNavbar: HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement;
    private readonly _deleteIcon: HTMLDeleteIconElement;
    private readonly _deleteText: HTMLDeleteTextElement;

    private _enabality: boolean;
    private _functionName: string

    constructor(toolsNavbar: HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._toolsNavbar = toolsNavbar;

        this._deleteIcon = new HTMLDeleteIconElement(this);
        this._deleteText = new HTMLDeleteTextElement(this);

        this._enabality = false;
        this._functionName = "";

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
        this.style.top = "4px";
        this.style.width = "80px";
        this.style.height = "30px";
        this.style.borderRadius = "5px";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.borderColor = "transparent";
        if (this._toolsNavbar instanceof HTMLSendedMessagesToolsElement) {
            this.style.left = "calc(100% - 180px)";
        }
        else {
            this.style.left = "calc(100% - 266px)";
        }
    }

    private createElements(): void {
        this.shadowRoot.appendChild(this._deleteIcon);
        this.shadowRoot.appendChild(this._deleteText);
    }

    private setEvents(): void {
        this.addEventListener("mouseover", function (this: HTMLDeleteElement, event: MouseEvent) {
            if (this._enabality) {
                this.style.backgroundColor = "rgb(250, 250, 250)";
                this.style.borderColor = "rgb(229, 229, 229)";
            }
        });

        this.addEventListener("mouseleave", function (this: HTMLDeleteElement, event: MouseEvent) {
            if (this._enabality) {
                this.style.borderColor = "transparent";
                this.style.backgroundColor = "transparent";
            }
        });

        this.addEventListener("mousedown", function (this: HTMLDeleteElement, event: MouseEvent) {
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
        this._deleteIcon.setEnablility(value);
        this._deleteText.setEnablility(value);
    }

    public setFunction(functionName: string): void {
        this._functionName = functionName;
    }

}

window.customElements.define("web-delete", HTMLDeleteElement);


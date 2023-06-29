import { HTMLPinIconElement } from "./HTMLPinIconElement.js";
import { HTMLPinTextElement } from "./HTMLPinTextElement.js";
import { HTMLReceivedMessagesToolsElement } from "./HTMLReceivedMessagesToolsElement.js";
import { HTMLSendedMessagesToolsElement } from "./HTMLSendedMessagesToolsElement.js";

export class HTMLPinElement extends HTMLElement {

    private readonly _toolsNavbar: HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement;
    private readonly _pinIcon: HTMLPinIconElement;
    private readonly _pinText: HTMLPinTextElement;

    private _enabality: boolean;
    private _functionName: string;

    constructor(toolsNavbar: HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._toolsNavbar = toolsNavbar;

        this._pinIcon = new HTMLPinIconElement(this);
        this._pinText = new HTMLPinTextElement(this);

        this._enabality = false;
        this._functionName = "";

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
        this.setEvent();
    }

    public setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.top = "4px";
        this.style.width = "56px";
        this.style.height = "30px";
        this.style.borderRadius = "5px";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.borderColor = "transparent";
        if (this._toolsNavbar instanceof HTMLSendedMessagesToolsElement) {
            this.style.left = "calc(100% - 239px)";
        }
        else {
            this.style.left = "calc(100% - 323px)";
        }
    }

    public createElements(): void {
        this.shadowRoot.appendChild(this._pinIcon);
        this.shadowRoot.appendChild(this._pinText);
    }

    public setEvent(): void {
        this.addEventListener("mouseover", function (this: HTMLPinElement, event: MouseEvent) {
            if (this._enabality) {
                this.style.backgroundColor = "rgb(250, 250, 250)";
                this.style.borderColor = "rgb(229, 229, 229)";
            }
        });

        this.addEventListener("mouseleave", function (this: HTMLPinElement, event: MouseEvent) {
            if (this._enabality) {
                this.style.borderColor = "transparent";
                this.style.backgroundColor = "transparent";
            }
        });

        this.addEventListener("mousedown", function (this: HTMLPinElement, event: MouseEvent) {
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
        this._pinIcon.setEnablility(value);
        this._pinText.setEnablility(value);
    }

    public setFunction(functionName: string): void {
        this._functionName = functionName;
    }

}

window.customElements.define("web-pin", HTMLPinElement);


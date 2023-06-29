import { HTMLReceivedMessagesToolsElement } from "./HTMLReceivedMessagesToolsElement.js";
import { HTMLSendedMessagesToolsElement } from "./HTMLSendedMessagesToolsElement.js";
import { HTMLShowIconElement } from "./HTMLShowIconElement.js";
import { HTMLShowTextElement } from "./HTMLShowTextElement.js";

export class HTMLShowElement extends HTMLElement {

    private readonly _toolsNavbar: HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement;
    private readonly _showIcon: HTMLShowIconElement;
    private readonly _showText: HTMLShowTextElement;

    private _enabality: boolean;
    private _functionName: string;

    constructor(toolsNavbar: HTMLReceivedMessagesToolsElement | HTMLSendedMessagesToolsElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._toolsNavbar = toolsNavbar;
        this._showIcon = new HTMLShowIconElement(this);
        this._showText = new HTMLShowTextElement(this);

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
        this.style.left = "calc(100% - 102px)";
        this.style.width = "76px";
        this.style.height = "30px";
        this.style.borderRadius = "5px";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.borderColor = "transparent";
    }

    public createElements(): void {
        this.shadowRoot.appendChild(this._showIcon);
        this.shadowRoot.appendChild(this._showText);
    }

    public setEvent(): void {
        this.addEventListener("mouseover", function (this: HTMLShowElement, event: MouseEvent) {
            if (this._enabality) {
                this.style.backgroundColor = "rgb(250, 250, 250)";
                this.style.borderColor = "rgb(229, 229, 229)";
            }
        });

        this.addEventListener("mouseleave", function (this: HTMLShowElement, event: MouseEvent) {
            if (this._enabality) {
                this.style.borderColor = "transparent";
                this.style.backgroundColor = "transparent";
            }
        });

        this.addEventListener("mousedown", function (this: HTMLShowElement, event: MouseEvent) {
            if (this._enabality) {
                eval(this._functionName + "();");
            }
        });
    }

    public getEnabality(): boolean {
        return this._enabality;
    }

    public setEnabality(value: boolean): void {
        this._enabality = value;
        this._showIcon.setEnabality(value);
        this._showText.setEnabality(value);
    }

    public setFunction(functionName: string): void {
        this._functionName = functionName;
    }

}

window.customElements.define("web-show", HTMLShowElement);
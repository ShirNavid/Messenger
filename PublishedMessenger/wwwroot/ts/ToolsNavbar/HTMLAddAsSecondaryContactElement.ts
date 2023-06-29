import { HTMLAddAsSecondaryContactIconElement } from "./HTMLAddAsSecondaryContactIconElement.js";
import { HTMLAddAsSecondaryContactTextElement } from "./HTMLAddAsSecondaryContactTextElement.js";
import { HTMLNewMessageToolsElement } from "./HTMLNewMessageToolsElement.js";
import { HTMLReplyMessageToolsElement } from "./HTMLReplyMessageToolsElement.js";

export class HTMLAddAsSecondaryContactElement extends HTMLElement {

    private readonly _toolsNavbar: HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement;
    private readonly _addAsSecondaryContactIcon: HTMLAddAsSecondaryContactIconElement;
    private readonly _addAsSecondaryContactText: HTMLAddAsSecondaryContactTextElement;

    private _enabality: boolean;
    private _functionName: string;

    constructor(toolsNavbar: HTMLNewMessageToolsElement | HTMLReplyMessageToolsElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._toolsNavbar = toolsNavbar;

        this._addAsSecondaryContactIcon = new HTMLAddAsSecondaryContactIconElement(this);
        this._addAsSecondaryContactText = new HTMLAddAsSecondaryContactTextElement(this);

        this._enabality = false;

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElement();
        this.setEvent();
    }

    private setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.width = "208px";
        this.style.height = "30px";
        this.style.borderRadius = "5px";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.borderColor = "transparent";
        this.style.top = "4px";
        if (this._toolsNavbar instanceof HTMLReplyMessageToolsElement) {
            this.style.right = "340px";
        }
        if (this._toolsNavbar instanceof HTMLNewMessageToolsElement) {
            this.style.right = "512px";
        }
    }

    private createElement(): void {
        this.shadowRoot.appendChild(this._addAsSecondaryContactIcon);
        this.shadowRoot.appendChild(this._addAsSecondaryContactText);
    }

    private setEvent(): void {
        this.addEventListener("mouseover", function (this: HTMLAddAsSecondaryContactElement, event: MouseEvent) {
            if (this._enabality) {
                this.style.backgroundColor = "rgb(250, 250, 250)";
                this.style.borderColor = "rgb(229, 229, 229)";
            }
        });

        this.addEventListener("mouseleave", function (this: HTMLAddAsSecondaryContactElement, event: MouseEvent) {
            if (this._enabality) {
                this.setEnabalityStyle();
            }
        });

        this.addEventListener("mousedown", function (this: HTMLAddAsSecondaryContactElement, event: MouseEvent) {
            if (this._enabality) {
                eval(this._functionName + "()");
                this.setEnabality(false);
            }
        });
    }

    public getEnabality(): boolean {
        return this._enabality;
    }

    public setEnabality(value: boolean): void {
        this._enabality = value;
        this.setEnabalityStyle();
        this._addAsSecondaryContactIcon.setEnabality(value);
        this._addAsSecondaryContactText.setEnabality(value);
    }

    public setFunctionName(functionName: string): void {
        this._functionName = functionName;
    }

    private setEnabalityStyle(): void {
        this.style.backgroundColor = "transparent";
        this.style.borderColor = "transparent";
    }

}

window.customElements.define("add-as-secondary-contact", HTMLAddAsSecondaryContactElement)



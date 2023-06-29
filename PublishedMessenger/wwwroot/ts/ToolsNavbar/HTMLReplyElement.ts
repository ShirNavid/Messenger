import { HTMLReceivedMessagesToolsElement } from "./HTMLReceivedMessagesToolsElement.js";
import { HTMLReplyIconElement } from "./HTMLReplyIconElement.js";
import { HTMLReplyTextElement } from "./HTMLReplyTextElement.js";

export class HTMLReplyElement extends HTMLElement {

    private readonly _toolsNavbar: HTMLReceivedMessagesToolsElement;
    private readonly _replyIcon: HTMLReplyIconElement;
    private readonly _replyText: HTMLReplyTextElement;

    private _enabality: boolean;
    private _functionName: string;

    constructor(toolsNavbar: HTMLReceivedMessagesToolsElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._toolsNavbar = toolsNavbar;
        this._replyIcon = new HTMLReplyIconElement(this);
        this._replyText = new HTMLReplyTextElement(this);

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
        this.style.left = "calc(100% - 184px)";
        this.style.width = "76px";
        this.style.height = "30px";
        this.style.borderRadius = "5px";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.borderColor = "transparent";
    }

    public createElements(): void {
        this.shadowRoot.appendChild(this._replyIcon);
        this.shadowRoot.appendChild(this._replyText);
    }

    public setEvent(): void {
        this.addEventListener("mouseover", function (this: HTMLReplyElement, event: MouseEvent) {
            if (this._enabality) {
                this.style.backgroundColor = "rgb(250, 250, 250)";
                this.style.borderColor = "rgb(229, 229, 229)";
            }
        });

        this.addEventListener("mouseleave", function (this: HTMLReplyElement, event: MouseEvent) {
            if (this._enabality) {
                this.style.borderColor = "transparent";
                this.style.backgroundColor = "transparent";
            }
        });

        this.addEventListener("mousedown", function (this: HTMLReplyElement, event: MouseEvent) {
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
        this._replyIcon.setEnabality(value);
        this._replyText.setEnabality(value);
    }

    public setFunction(functionName: string): void {
        this._functionName = functionName;
    }

}

window.customElements.define("web-reply", HTMLReplyElement);
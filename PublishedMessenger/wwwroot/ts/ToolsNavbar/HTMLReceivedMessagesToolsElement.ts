import { HTMLDeleteElement } from "./HTMLDeleteElement.js";
import { HTMLMarkAsReadElement } from "./HTMLMarkAsReadElement.js";
import { HTMLNewMailElement } from "./HTMLNewMailElement.js";
import { HTMLPinElement } from "./HTMLPinElement.js";
import { HTMLReplyElement } from "./HTMLReplyElement.js";
import { HTMLShowElement } from "./HTMLShowElement.js";
import { HTMLToolsNavbarElement } from "./HTMLToolsNavbarElement.js";
import { ToolsBase } from "./ToolsBase.js";

export class HTMLReceivedMessagesToolsElement extends ToolsBase {

    private readonly _newMail: HTMLNewMailElement;
    private readonly _markAsRead: HTMLMarkAsReadElement;
    private readonly _pin: HTMLPinElement;
    private readonly _delete: HTMLDeleteElement;
    private readonly _reply: HTMLReplyElement;
    private readonly _show: HTMLShowElement;

    constructor(toolsNavbar: HTMLToolsNavbarElement) {
        super(toolsNavbar);

        this._newMail = new HTMLNewMailElement(this);
        this._markAsRead = new HTMLMarkAsReadElement(this);
        this._pin = new HTMLPinElement(this);
        this._delete = new HTMLDeleteElement(this);
        this._reply = new HTMLReplyElement(this);
        this._show = new HTMLShowElement(this);

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
    }

    private setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.top = "0px";
        this.style.left = "48px";
        this.style.height = "100%";
        this.style.width = "calc(100% - 48px)";
    }

    private createElements() {
        this.shadowRoot.appendChild(this._newMail);

        this.shadowRoot.appendChild(this._markAsRead);
        this.shadowRoot.appendChild(this._pin);
        this.shadowRoot.appendChild(this._delete);
        this.shadowRoot.appendChild(this._reply);
        this.shadowRoot.appendChild(this._show);

        this._markAsRead.setEnabality(false);
        this._pin.setEnabality(false);
        this._delete.setEnabality(false);
        this._reply.setEnabality(false);
        this._show.setEnabality(false);
    }

    public getMarkAsReadEnability(): boolean {
        return this._markAsRead.getEnabality();
    }

    public setMarkAsReadEnability(value: boolean): void {
        this._markAsRead.setEnabality(value);
    }

    public setMarkAsReadFunction(functionName: string): void {
        this._markAsRead.setFunction(functionName);
    }

    public getPinEnability(): boolean {
        return this._pin.getEnabality();
    }

    public setPinEnability(value: boolean): void {
        this._pin.setEnabality(value);
    }

    public setPinFunction(functionName: string): void {
        this._pin.setFunction(functionName);
    }

    public getDeleteEnability(): boolean {
        return this._delete.getEnabality();
    }

    public setDeleteEnability(value: boolean): void {
        this._delete.setEnabality(value);
    }

    public setDeleteFunction(functionName: string): void {
        this._delete.setFunction(functionName);
    }

    public getReplyEnability(): boolean {
        return this._reply.getEnabality();
    }

    public setReplyEnability(value: boolean): void {
        this._reply.setEnabality(value);
    }

    public setReplyFunction(functionName: string): void {
        this._reply.setFunction(functionName);
    }

    public getShowEnability(): boolean {
        return this._show.getEnabality();
    }

    public setShowEnability(value: boolean): void {
        this._show.setEnabality(value);
    }

    public setShowFunction(functionName: string): void {
        this._show.setFunction(functionName);
    }

}

window.customElements.define("received-messages-tools", HTMLReceivedMessagesToolsElement);


import { HTMLSelectAccountListElement } from "./HTMLSelectAccountListElement.js";
import { HTMLSelectAccountItemImageElement } from "./HTMLSelectAccountItemImageElement.js";
import { HTMLSelectAccountItemTextElement } from "./HTMLSelectAccountItemTextElement.js";
import { AccountData } from "./AccountData.js";
import { HTMLSelectAccountSelectedItemElement } from "./HTMLSelectAccountSelectedItemElement.js";

export class HTMLSelectAccountItemElement extends HTMLElement {

    private readonly _selectAccountList: HTMLSelectAccountListElement;
    private readonly _accountData: AccountData;
    private readonly _index: number;

    private readonly _selectAccountItemImage: HTMLSelectAccountItemImageElement;
    private readonly _selectAccountItemText: HTMLSelectAccountItemTextElement;

    constructor(selectAccountList: HTMLSelectAccountListElement, accountData: AccountData, index: number) {
        super();

        this.attachShadow({ mode: 'open' });

        this._selectAccountList = selectAccountList;
        this._accountData = accountData;
        this._index = index;

        this._selectAccountItemText = new HTMLSelectAccountItemTextElement(this, accountData.text);
        this._selectAccountItemImage = new HTMLSelectAccountItemImageElement(this, accountData.image);

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
        this.style.width = "100%";
        this.style.height = "29px";
        this.style.top = ((this._index * 30) + 1) + "px";
        this.style.left = "0px";
        if (this._index != 0) {
            this.style.borderTop = "solid rgb(240, 240, 240) 1px";
        }
        this.style.backgroundColor = "white";
        this.style.color = "black";
    }

    private createElements(): void {
        this.shadowRoot.appendChild(this._selectAccountItemText);
        this.shadowRoot.appendChild(this._selectAccountItemImage);
    }

    public runMouseOverEvent(): void {
        this._selectAccountItemText.runMouseOverEvent()
        this._selectAccountItemImage.runMouseOverEvent()
    }

    public runMouseLeaveEvent(): void {
        this._selectAccountItemText.runMouseLeaveEvent()
        this._selectAccountItemImage.runMouseLeaveEvent()
    }

    public close(): void {
        this._selectAccountList.close();
    }

    public setValue(): void {
        this._selectAccountList.setValue(this._accountData);
    }

    public getData(): AccountData {
        return this._accountData;
    }

}

window.customElements.define("select-account-item", HTMLSelectAccountItemElement);

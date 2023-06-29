import { HTMLSelectAccountElement } from "./HTMLSelectAccountElement.js";
import { HTMLSelectAccountSelectedItemTextElement } from "./HTMLSelectAccountSelectedItemTextElement.js";
import { HTMLSelectAccountSelectedItemImageElement } from "./HTMLSelectAccountSelectedItemImageElement.js";
import { AccountData } from "./AccountData.js";

export class HTMLSelectAccountSelectedItemElement extends HTMLElement {

    private readonly _selectAccount: HTMLSelectAccountElement;
    private readonly _selectAccountSelectedItemText: HTMLSelectAccountSelectedItemTextElement;
    private readonly _selectAccountSelectedItemImage: HTMLSelectAccountSelectedItemImageElement;

    private _accountData: AccountData;

    constructor(selectAccount: HTMLSelectAccountElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._selectAccount = selectAccount;

        this._selectAccountSelectedItemText = new HTMLSelectAccountSelectedItemTextElement(this, null);
        this._selectAccountSelectedItemImage = new HTMLSelectAccountSelectedItemImageElement(this, null);

        this._accountData = null;

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
        this.style.height = "30px";
        this.style.width = "300px";
        this.style.top = "0px";
        this.style.left = "0px";
        this.style.backgroundColor = "rgb(55, 91, 122)";
        this.style.borderBottom = "solid 1px rgb(55, 91, 122)";
        this.style.borderRadius = "4px";
    }

    private createElements(): void {
        this.shadowRoot.appendChild(this._selectAccountSelectedItemImage);
        this.shadowRoot.appendChild(this._selectAccountSelectedItemText);
    }

    private setEvents(): void {

        this.addEventListener("mouseover", function (this: HTMLSelectAccountSelectedItemElement, event: MouseEvent) {
            this._selectAccount.mouseOverEvent();
        });

        this.addEventListener("mouseleave", function (this: HTMLSelectAccountSelectedItemElement, event: MouseEvent) {
            this._selectAccount.mouseLeaveEvent();
        });
    }

    public changeListStatus(): void {
        this._selectAccount.changeListStatus()
    }

    public setValue(value: AccountData): void {
        this._accountData = value;
        if (value != null) {
            this._selectAccountSelectedItemText.setValue(value.text);
            this._selectAccountSelectedItemImage.setValue(value.image);
        }
        else {
            this._selectAccountSelectedItemText.setValue("");
            this._selectAccountSelectedItemImage.setValue("");
        }
    }

    public mouseOverEvent(): void {
        this.style.backgroundColor = "rgb(39, 64, 86)";
    }

    public mouseLeaveEvent(): void {
        this.style.backgroundColor = "rgb(55, 91, 122)";
    }

    public getAccountData(): AccountData {
        return this._accountData;
    }

}

window.customElements.define("select-account-selected-item", HTMLSelectAccountSelectedItemElement);

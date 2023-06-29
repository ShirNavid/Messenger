import { AccountData } from "./AccountData.js";
import { HTMLSelectAccountElement } from "./HTMLSelectAccountElement.js";
import { HTMLSelectAccountItemElement } from "./HTMLSelectAccountItemElement.js";

export class HTMLSelectAccountListElement extends HTMLElement {

    private readonly _selectAccount: HTMLSelectAccountElement;
    private readonly _itemsLength: number;
    private readonly _selectAccountItems: HTMLSelectAccountItemElement[];

    constructor(selectAccount: HTMLSelectAccountElement, accountsData: AccountData[]) {
        super();

        this.attachShadow({ mode: 'open' });

        this._selectAccount = selectAccount;

        this._itemsLength = accountsData.length;
        this._selectAccountItems = accountsData.map((c, i) => new HTMLSelectAccountItemElement(this, c, i));

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
    }

    private setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "none";
        this.style.overflowY = "scroll";
        this.style.overflow = "hidden";
        this.style.width = "298px";
        this.style.height = this.getHeight();
        this.style.left = "0px";
        this.style.top = "31px";
        this.style.borderRadius = "5px";
        this.style.border = "solid rgb(240, 240, 240) 1px";
    }

    private createElements(): void {
        this._selectAccountItems.forEach(c => this.shadowRoot.appendChild(c));
    }

    private getHeight(): string {
        const height = Math.min((this._itemsLength * 30) + 1, 281) + "px";
        return height;
    }

    public changeListStatus(): void {
        this._selectAccount.changeListStatus();
    }

    public setOpened(): void {
        this.style.display = "inline-block";
    }

    public close(): void {
        this._selectAccount.close();
    }

    public setClosed(): void {
        this.style.display = "none";
    }

    public setValue(accountData: AccountData): void {
        this._selectAccount.setValue(accountData);
    }

}

window.customElements.define("select-account-list", HTMLSelectAccountListElement);


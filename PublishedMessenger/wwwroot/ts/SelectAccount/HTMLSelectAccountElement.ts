import { AccountData } from "./AccountData.js";
import { HTMLSelectAccountListElement } from "./HTMLSelectAccountListElement.js";
import { HTMLSelectAccountManagerElement } from "./HTMLSelectAccountManagerElement.js";
import { HTMLSelectAccountSelectedItemElement } from "./HTMLSelectAccountSelectedItemElement.js";

export class HTMLSelectAccountElement extends HTMLElement {

    private _selectAccountManager: HTMLSelectAccountManagerElement;
    private _selectAccountSelectedItem: HTMLSelectAccountSelectedItemElement;
    private _selectAccountList: HTMLSelectAccountListElement;
    private _itemsLength: number;
    private _isOpened: boolean;
    private _functionName: string;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
    }

    public setSelectAccountManager(selectAccountManager: HTMLSelectAccountManagerElement): void {
        this._selectAccountManager = selectAccountManager;
        this._selectAccountManager.setSelectAccount(this);
    }

    public setElement(): void {
        const accountsData = this._selectAccountManager.getSelectAccountItemsData();

        this._itemsLength = accountsData.length;
        this._selectAccountSelectedItem = new HTMLSelectAccountSelectedItemElement(this);
        this._selectAccountList = new HTMLSelectAccountListElement(this, accountsData);
        this._isOpened = false;

        this.setStyle();
        this.createElements();
    }

    private setStyle(): void {
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.width = "300px";
        this.style.borderRadius = "5px";
        this.style.backgroundColor = "transparent";
        this.style.height = "30px";
    }

    private createElements(): void {
        if (this._selectAccountSelectedItem != undefined) {
            this._selectAccountSelectedItem.remove();
            this._selectAccountList.remove();
        }
        this.shadowRoot.appendChild(this._selectAccountSelectedItem);
        this.shadowRoot.appendChild(this._selectAccountList);
    }

    private getOpenedHeight(): string {
        const height = (Math.min(30 * (this._itemsLength + 1), 280) + 5) + "px";
        return height;
    }

    public searchAndSetItems(searchedText: string): void {
        this._selectAccountManager.search(searchedText);
        this.createElements();
    }

    public setValue(value: AccountData): void {
        this._selectAccountSelectedItem.setValue(value);
        this.runSelectionFunction();
    }

    public mouseOverEvent(): void {
        if (!this._isOpened) {
            this._selectAccountSelectedItem.mouseOverEvent();
        }
    }

    public mouseLeaveEvent(): void {
        if (!this._isOpened) {
            this._selectAccountSelectedItem.mouseLeaveEvent();
        }
    }

    public changeListStatus(): void {
        if (this._isOpened == false) {
            this._isOpened = true;
            this.style.height = this.getOpenedHeight();
            this._selectAccountList.setOpened();
            this._selectAccountSelectedItem.mouseOverEvent();
        }
        else {
            this.close()
        }
    }

    public close(): void {
        if (this._isOpened == true) {
            this._isOpened = false;
            this.style.height = "30px";
            this._selectAccountSelectedItem.mouseLeaveEvent();
            this._selectAccountList.setClosed();
        }
    }

    public search(searchedText: string): void {
        this._selectAccountManager.search(searchedText);
        this.setElement();
    }

    public getSelectedAccountData(): AccountData {
        const selectedAccountData = this._selectAccountSelectedItem.getAccountData();
        return selectedAccountData;
    }

    public setSelectionFunction(functionName: string): void {
        this._functionName = functionName;
    }

    private runSelectionFunction(): void {
        eval(this._functionName + "()");
    }

}

window.customElements.define("select-account", HTMLSelectAccountElement);


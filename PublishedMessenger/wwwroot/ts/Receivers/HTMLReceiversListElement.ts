import { AccountData } from "../SelectAccount/AccountData.js";
import { HTMLMainContactElement } from "./HTMLMainContactElement.js";
import { HTMLReceiverItemElement } from "./HTMLReceiverItemElement.js";
import { HTMLSecondaryContactElement } from "./HTMLSecondaryContactElement.js";

export class HTMLReceiversListElement extends HTMLElement {

    private _mainContact: HTMLMainContactElement;
    private _secondaryContacts: HTMLSecondaryContactElement[];
    private _mainReceiverId: number;

    private _functionName: string;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this._mainContact = null;
        this._secondaryContacts = new Array<HTMLSecondaryContactElement>();

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
    }

    private setStyle(): void {
        this.style.position = "relative";
        this.style.display = "block";
        this.style.width = "calc(100% - 40px)";
        this.style.height = "57px";
        this.style.left = "20px";
        this.style.padding = "12px 12px";
        this.style.boxSizing = "border-box";
        this.style.overflowY = "auto";

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "~/css/Components/Scroll.css";
        this.shadowRoot.appendChild(link);
    }

    private createElements(): void  {
        
    }

    public setMainReceiverId(mainReceiverId: number): void {
        this._mainReceiverId = mainReceiverId;
    }

    public setMainContact(accountData: AccountData): void {
        if (this._mainContact != null) {
            this._mainContact.remove();
        }
        const isFixed = this._mainReceiverId == accountData.id;
        this._mainContact = new HTMLMainContactElement(this, accountData, isFixed);
        this.shadowRoot.prepend(this._mainContact);
    }

    public getMainContact(): AccountData {
        let accountData: AccountData = null;
        if (this._mainContact != null) {
            accountData = this._mainContact.getAccountData();
        }
        return accountData;
    }

    public addSecondaryContact(accountData: AccountData): void {
        const secondaryContact = new HTMLSecondaryContactElement(this, accountData);
        this._secondaryContacts.push(secondaryContact);
        this.shadowRoot.appendChild(secondaryContact);
    }

    public getSecondaryContacts(): AccountData[] {
        const accountDatas = this._secondaryContacts.map(c => c.getAccountData());
        return accountDatas;
    }

    public removeReceiverItem(receiverItem: HTMLReceiverItemElement): void {
        if (this._mainContact == receiverItem) {
            this._mainContact = null;
        }
        else {
            const index = this._secondaryContacts.map(c => c as HTMLReceiverItemElement).indexOf(receiverItem);
            this._secondaryContacts.splice(index, 1);
            receiverItem.remove();
        }
        eval(this._functionName + "()");
    }

    public setRemovalFunction(functionName: string): void {
        this._functionName = functionName;
    }

}

window.customElements.define("receivers-list", HTMLReceiversListElement);
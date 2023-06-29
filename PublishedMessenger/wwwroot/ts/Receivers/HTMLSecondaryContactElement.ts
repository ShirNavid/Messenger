import { AccountData } from "../SelectAccount/AccountData.js";
import { HTMLReceiverItemElement } from "./HTMLReceiverItemElement.js";
import { HTMLReceiversListElement } from "./HTMLReceiversListElement.js";

export class HTMLSecondaryContactElement extends HTMLReceiverItemElement {

    constructor(receiversList: HTMLReceiversListElement, accountData: AccountData) {
        super(receiversList, accountData);

        this.setElements();
    }

    private setElements(): void {
        this.setStyle();
    }

    public setStyle(): void {
        this.style.backgroundColor = "white";
        this.style.color = "black";
        this.style.border = "solid rgb(138, 93, 13) 2px";

        const style = document.createElement("style");
        style.innerHTML =
            "span {" +
            "    background-color: rgb(138, 93, 13);" +
            "    color: white;" +
            "}" +
            "text {" +
            "    color: black;" +
            "}" +
            "";

        this.shadowRoot.appendChild(style);
    }

}

window.customElements.define("sacondary-contact", HTMLSecondaryContactElement);


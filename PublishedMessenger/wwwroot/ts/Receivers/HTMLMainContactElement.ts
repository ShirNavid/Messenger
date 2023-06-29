import { AccountData } from "../SelectAccount/AccountData.js";
import { HTMLReceiverItemElement } from "./HTMLReceiverItemElement.js";
import { HTMLReceiversListElement } from "./HTMLReceiversListElement.js";

export class HTMLMainContactElement extends HTMLReceiverItemElement {

    constructor(receiversList: HTMLReceiversListElement, accountData: AccountData, isFixed: boolean) {
        super(receiversList, accountData);

        this.setElements(isFixed);
    }

    private setElements(isFixed: boolean): void {
        this.setStyle();
        this.createElement(isFixed);
    }

    public setStyle(): void {
        this.style.backgroundColor = "black";
        this.style.color = "white";
        this.style.border = "solid black 2px";

        const style = document.createElement("style");
        style.innerHTML =
            "span {" +
            "    background-color: black;" +
            "    color: white;" +
            "}" +
            "text {" +
            "    color: white;" +
            "}" +
            "";

        this.shadowRoot.appendChild(style);
    }

    private createElement(isFixed: boolean): void {
        if (isFixed) {
            this.classList.add("fixed");
        }
    }

}

window.customElements.define("main-contact", HTMLMainContactElement);


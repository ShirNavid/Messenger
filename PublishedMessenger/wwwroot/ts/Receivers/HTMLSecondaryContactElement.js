import { HTMLReceiverItemElement } from "./HTMLReceiverItemElement.js";
export class HTMLSecondaryContactElement extends HTMLReceiverItemElement {
    constructor(receiversList, accountData) {
        super(receiversList, accountData);
        this.setElements();
    }
    setElements() {
        this.setStyle();
    }
    setStyle() {
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
//# sourceMappingURL=HTMLSecondaryContactElement.js.map
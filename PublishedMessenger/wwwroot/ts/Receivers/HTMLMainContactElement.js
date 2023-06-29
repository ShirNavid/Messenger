import { HTMLReceiverItemElement } from "./HTMLReceiverItemElement.js";
export class HTMLMainContactElement extends HTMLReceiverItemElement {
    constructor(receiversList, accountData, isFixed) {
        super(receiversList, accountData);
        this.setElements(isFixed);
    }
    setElements(isFixed) {
        this.setStyle();
        this.createElement(isFixed);
    }
    setStyle() {
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
    createElement(isFixed) {
        if (isFixed) {
            this.classList.add("fixed");
        }
    }
}
window.customElements.define("main-contact", HTMLMainContactElement);
//# sourceMappingURL=HTMLMainContactElement.js.map
import { HTMLMessageElement } from "./HTMLMessageElement.js";
import { MessageDisplayerBase } from "./MessageDisplayerBase.js";
export class HTMLMessageDisplayerElement extends MessageDisplayerBase {
    constructor() {
        super();
    }
    connectedCallback() {
        super.connectedCallback();
        this._messages = this.getMessagesData()
            .map(c => new HTMLMessageElement(this, c));
        this._displayerType = this.getAttribute("displayer-type");
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "relative";
        this.style.top = "0px";
        this.style.padding = "16px";
        this.style.overflow = "hidden";
        if (this._displayerType == "reply") {
            this.style.minHeight = "calc(100% - 282px)";
        }
        else {
            this.style.boxSizing = "border-box";
            this.style.minHeight = "100%";
        }
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "~/css/Components/Scroll.css";
        this.shadowRoot.appendChild(link);
    }
    createElements() {
        this._messages.forEach(c => this.shadowRoot.appendChild(c));
    }
}
window.customElements.define("message-displayer", HTMLMessageDisplayerElement);
//# sourceMappingURL=HTMLMessageDisplayerElement.js.map
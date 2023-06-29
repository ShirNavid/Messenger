export class HTMLYesButtonElement extends HTMLElement {
    constructor(deleteMessage) {
        super();
        this._deleteMessage = deleteMessage;
        this.attachShadow({ mode: "open" });
        this.setElement();
    }
    setElement() {
        this.createStyle();
        this.createElements();
        this.setEvent();
    }
    createStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.userSelect = "none";
        this.style.borderRadius = "5px";
        this.style.border = "solid white 2px";
        this.style.padding = "4px 11px";
        this.style.marginRight = "5px";
        this.style.marginLeft = "105px";
        this.style.backgroundColor = "#727272";
    }
    createElements() {
        const text = document.createElement("text");
        text.innerHTML = "Yes";
        this.shadowRoot.appendChild(text);
    }
    setEvent() {
        this.addEventListener("mousedown", function () {
            this._deleteMessage.runFunction();
            this._deleteMessage.setOff();
        });
        this.addEventListener("mouseover", function () {
            this.style.backgroundColor = "#868686";
        });
        this.addEventListener("mouseleave", function () {
            this.style.backgroundColor = "#727272";
        });
    }
}
window.customElements.define("yes-button", HTMLYesButtonElement);
//# sourceMappingURL=HTMLYesButtonElement.js.map
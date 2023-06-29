export class HTMLNoButtonElement extends HTMLElement {
    constructor(deleteMessage) {
        super();
        this.attachShadow({ mode: "open" });
        this._deleteMessage = deleteMessage;
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
        this.style.backgroundColor = "#727272";
    }
    createElements() {
        const text = document.createElement("text");
        text.innerHTML = "No";
        this.shadowRoot.appendChild(text);
    }
    setEvent() {
        this.addEventListener("mousedown", function () {
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
window.customElements.define("no-button", HTMLNoButtonElement);
//# sourceMappingURL=HTMLNoButtonElement.js.map
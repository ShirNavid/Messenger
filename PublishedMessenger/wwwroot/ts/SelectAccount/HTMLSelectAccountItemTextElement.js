export class HTMLSelectAccountItemTextElement extends HTMLElement {
    constructor(selectAccountItem, text) {
        super();
        this.attachShadow({ mode: 'open' });
        this._selectAccountItem = selectAccountItem;
        this._text = text;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
        this.setEvent();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.left = "0px";
        this.style.width = "251px";
        this.style.height = "100%";
        const style = document.createElement("style");
        style.innerHTML =
            "text {" +
                "    position: absolute;" +
                "    display: inline-block;" +
                "    top: 5px;" +
                "    font-size: 13px;" +
                "    left: 20px;" +
                "    user-select: none;" +
                "}";
        this.shadowRoot.appendChild(style);
    }
    createElements() {
        const text = document.createElement("text");
        text.innerHTML = this._text;
        this.shadowRoot.appendChild(text);
    }
    setEvent() {
        this.addEventListener("mouseover", function (event) {
            this._selectAccountItem.runMouseOverEvent();
        });
        this.addEventListener("mouseleave", function (event) {
            this._selectAccountItem.runMouseLeaveEvent();
        });
        this.addEventListener("mousedown", function (event) {
            this._selectAccountItem.setValue();
            this._selectAccountItem.close();
        });
    }
    runMouseOverEvent() {
        this.style.backgroundColor = "rgb(250, 250, 250)";
    }
    runMouseLeaveEvent() {
        this.style.backgroundColor = "white";
    }
}
window.customElements.define("select-account-item-text", HTMLSelectAccountItemTextElement);
//# sourceMappingURL=HTMLSelectAccountItemTextElement.js.map
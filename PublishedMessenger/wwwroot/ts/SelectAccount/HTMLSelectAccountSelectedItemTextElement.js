export class HTMLSelectAccountSelectedItemTextElement extends HTMLElement {
    constructor(selectAccountSelectedItem, text) {
        super();
        this.attachShadow({ mode: 'open' });
        this._selectAccountSelectedItem = selectAccountSelectedItem;
        this.setElement(text);
    }
    setElement(text) {
        this.setStyle();
        this.createElements(text);
        this.setEvent();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.left = "0px";
        this.style.width = "251px";
        this.style.height = "100%";
        this.style.color = "white";
        const style = document.createElement("style");
        style.innerHTML =
            "text {" +
                "    position: absolute;" +
                "    display: inline-block;" +
                "    top: 4px;" +
                "    left: 20px;" +
                "    user-select: none;" +
                "}";
        this.shadowRoot.appendChild(style);
    }
    createElements(text) {
        const textElement = document.createElement("text");
        if (text != null) {
            textElement.innerHTML = text;
        }
        this.shadowRoot.appendChild(textElement);
    }
    setEvent() {
        this.addEventListener("mousedown", function (event) {
            this._selectAccountSelectedItem.changeListStatus();
        });
    }
    setValue(text) {
        this.shadowRoot.querySelector("text").innerHTML = text;
    }
}
window.customElements.define("select-account-selected-item-text", HTMLSelectAccountSelectedItemTextElement);
//# sourceMappingURL=HTMLSelectAccountSelectedItemTextElement.js.map
export class HTMLAddAsSecondaryContactTextElement extends HTMLElement {
    constructor(addAsSecondaryContact) {
        super();
        this.attachShadow({ mode: "open" });
        this._addAsSecondaryContact = addAsSecondaryContact;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.userSelect = "none";
        this.style.top = "5px";
        this.style.left = "37px";
        const style = document.createElement("style");
        style.innerHTML =
            "text {" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    overflow: hidden;" +
                "    font-size: 14px;" +
                "}" +
                "";
        this.shadowRoot.appendChild(style);
    }
    createElements() {
        const text = document.createElement("text");
        text.innerHTML = "Add as secondary contact";
        this.shadowRoot.appendChild(text);
    }
    setEnabality(value) {
        this.style.color = value ? "black" : "#C3C3C3";
    }
}
window.customElements.define("add-as-secondary-contact-text", HTMLAddAsSecondaryContactTextElement);
//# sourceMappingURL=HTMLAddAsSecondaryContactTextElement.js.map
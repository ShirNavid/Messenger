export class HTMLAddAsSecondaryContactIconElement extends HTMLElement {
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
        this.style.top = "2px";
        this.style.left = "10px";
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
        this.shadowRoot.appendChild(link);
        const style = document.createElement("style");
        style.innerHTML =
            "span {" +
                "    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    overflow: hidden;" +
                "    user-select: none;" +
                "}" +
                "";
        this.shadowRoot.appendChild(style);
    }
    createElements() {
        const span = document.createElement("span");
        span.classList.add("material-symbols-outlined");
        span.innerHTML = "Person_Add";
        this.shadowRoot.appendChild(span);
    }
    setEnabality(value) {
        this.style.color = value ? "#38DE13" : "#C3C3C3";
    }
}
window.customElements.define("add-as-secondary-contact-icon", HTMLAddAsSecondaryContactIconElement);
//# sourceMappingURL=HTMLAddAsSecondaryContactIconElement.js.map
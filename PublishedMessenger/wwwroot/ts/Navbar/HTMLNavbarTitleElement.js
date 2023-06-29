export class HTMLNavbarTitleElement extends HTMLElement {
    constructor(navbar) {
        super();
        this.attachShadow({ mode: 'open' });
        this._navbar = navbar;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElement();
    }
    setStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "48px";
        this.style.width = "100px";
        this.style.top = "0px";
        this.style.color = "#FFFFFF";
        this.style.userSelect = "none";
        this.style.cursor = "pointer";
        const style = document.createElement("style");
        style.innerHTML =
            "text {" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    overflow: hidden;" +
                "    top: 13px;" +
                "    font-weight: 600;" +
                "    left: 15px;" +
                "}" +
                "";
        this.shadowRoot.appendChild(style);
    }
    createElement() {
        const text = document.createElement("text");
        text.innerHTML = "Messenger";
        this.shadowRoot.appendChild(text);
    }
}
window.customElements.define("navbar-title", HTMLNavbarTitleElement);
//# sourceMappingURL=HTMLNavbarTitleElement.js.map
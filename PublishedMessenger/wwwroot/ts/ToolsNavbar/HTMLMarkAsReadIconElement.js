export class HTMLMarkAsReadIconElement extends HTMLElement {
    constructor(markAsRead) {
        super();
        this.attachShadow({ mode: 'open' });
        this._markAsRead = markAsRead;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "21px";
        this.style.top = "4px";
        this.style.left = "6px";
        this.style.userSelect = "none";
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
        this.shadowRoot.appendChild(link);
        const style = document.createElement("style");
        style.innerHTML =
            "span.material-symbols-outlined {" +
                "    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    overflow: hidden;" +
                "    width: 100%;" +
                "    height: 100%;" +
                "    font-size: 23px;" +
                "}" +
                "";
        this.shadowRoot.appendChild(style);
    }
    createElements() {
        const span = document.createElement("span");
        span.classList.add("material-symbols-outlined");
        span.innerHTML = "Drafts";
        this.shadowRoot.appendChild(span);
    }
    setEnablility(value) {
        this.style.color = value ? "#E3D500" : "#C3C3C3";
    }
}
window.customElements.define("mark-as-read-icon", HTMLMarkAsReadIconElement);
//# sourceMappingURL=HTMLMarkAsReadIconElement.js.map
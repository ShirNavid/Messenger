export class HTMLToolsNavbarMenuElement extends HTMLElement {
    constructor(toolsNavbar) {
        super();
        this.attachShadow({ mode: 'open' });
        this._toolsNavbar = toolsNavbar;
        this._isListOpened = false;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.left = "6px";
        this.style.top = "3px";
        this.style.height = "32px";
        this.style.width = "40px";
        this.style.userSelect = "none";
        this.style.cursor = "default";
        this.style.backgroundColor = "transparent";
        this.style.borderRadius = "5px";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.borderColor = "transparent";
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
        this.shadowRoot.appendChild(link);
        const style = document.createElement("style");
        style.innerHTML =
            "span.material-symbols-outlined {" +
                "    font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48;" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    top: 50%;" +
                "    transform: translateY(-50%);" +
                "    left: 8px;" +
                "}" +
                "";
        this.shadowRoot.appendChild(style);
    }
    createElements() {
        const span = document.createElement("span");
        span.classList.add("material-symbols-outlined");
        span.innerHTML = "menu";
        this.shadowRoot.appendChild(span);
    }
    setEvents() {
        this.addEventListener("mouseover", function (event) {
            this.style.backgroundColor = "rgb(250, 250, 250)";
            this.style.borderColor = "rgb(229, 229, 229)";
        });
        this.addEventListener("mouseleave", function (event) {
            this.style.borderColor = "transparent";
            this.style.backgroundColor = "transparent";
        });
        this.addEventListener("mousedown", function (event) {
            const list = document.querySelector("tools-navbar-menu-list");
            const iframe = document.querySelector("iframe");
            if (iframe.classList.contains("initial-class")) {
                iframe.classList.remove("initial-class");
            }
            if (this._isListOpened == false) {
                if (iframe.classList.contains("lengthening")) {
                    iframe.classList.remove("lengthening");
                }
                iframe.classList.add("shortening");
                this._isListOpened = true;
                list["setStatus"](true);
            }
            else {
                iframe.classList.add("lengthening");
                list["setStatus"](false);
                if (iframe.classList.contains("shortening")) {
                    iframe.classList.remove("shortening");
                }
                this._isListOpened = false;
            }
        });
    }
}
window.customElements.define("tools-navbar-menu", HTMLToolsNavbarMenuElement);
//# sourceMappingURL=HTMLToolsNavbarMenuElement.js.map
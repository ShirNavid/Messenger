export class HTMLNavbarAppsElement extends HTMLElement {
    constructor(navbar) {
        super();
        this.attachShadow({ mode: 'open' });
        this._navbar = navbar;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }
    setStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "48px";
        this.style.width = "48px";
        this.style.top = "0px";
        this.style.backgroundColor = "transparent";
        this.style.color = "#FFFFFF";
        this.style.userSelect = "none";
        this.style.cursor = "pointer";
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
        this.shadowRoot.appendChild(link);
        const style = document.createElement("style");
        style.innerHTML =
            "span.material-symbols-outlined {" +
                "    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    top: 12px;" +
                "    left: 12px;" +
                "    height: 24px;" +
                "    width: 24px;" +
                "}" +
                "";
        this.shadowRoot.appendChild(style);
    }
    createElements() {
        const span = document.createElement("span");
        span.innerHTML = "apps";
        this.shadowRoot.appendChild(span);
        span.classList.add("material-symbols-outlined");
    }
    setEvents() {
        this.addEventListener("mouseover", function (event) {
            this.style.animation = "set-apps-on";
            this.style.animationDuration = "0.2s";
            this.style.animationFillMode = "forwards";
        });
        this.addEventListener("mouseleave", function (event) {
            this.style.animation = "";
            this.style.animationDuration = "";
            this.style.animationFillMode = "";
        });
    }
}
window.customElements.define("navbar-apps", HTMLNavbarAppsElement);
//# sourceMappingURL=HTMLNavbarAppsElement.js.map
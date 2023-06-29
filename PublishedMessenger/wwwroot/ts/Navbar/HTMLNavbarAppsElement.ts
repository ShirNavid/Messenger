import { HTMLNavbarElement } from "./HTMLNavbarElement.js";

export class HTMLNavbarAppsElement extends HTMLElement {

    private readonly _navbar: HTMLNavbarElement;

    constructor(navbar: HTMLNavbarElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._navbar = navbar;

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }

    private setStyle(): void {
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

    private createElements(): void {
        const span = document.createElement("span");
        span.innerHTML = "apps";
        this.shadowRoot.appendChild(span);
        span.classList.add("material-symbols-outlined");
    }

    private setEvents(): void {
        this.addEventListener("mouseover", function (this: HTMLNavbarAppsElement, event: MouseEvent) {
            this.style.animation = "set-apps-on";
            this.style.animationDuration = "0.2s";
            this.style.animationFillMode = "forwards";
        });
        this.addEventListener("mouseleave", function (this: HTMLNavbarAppsElement, event: MouseEvent) {
            this.style.animation = "";
            this.style.animationDuration = "";
            this.style.animationFillMode = "";
        });
    }

}

window.customElements.define("navbar-apps", HTMLNavbarAppsElement);


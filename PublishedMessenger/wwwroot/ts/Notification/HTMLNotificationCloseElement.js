export class HTMLNotificationCloseElement extends HTMLElement {
    constructor(notification) {
        super();
        this.attachShadow({ mode: 'open' });
        this._notification = notification;
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
        this.style.right = "0px";
        this.style.height = "100%";
        this.style.width = "60px";
        const style = document.createElement("style");
        style.innerHTML =
            "div {" +
                "    position: absolute;" +
                "    display: inline-block;" +
                "    top: 0px;" +
                "    left: 0px;" +
                "    width: 100%;" +
                "    height: 100%;" +
                "    background-color: #c4c4c4;" +
                "    color: black;" +
                "}" +
                "div.red {" +
                "    background-color: #c4c4c4;" +
                "    color: black;" +
                "    animation-name: becoming-red;" +
                "    animation-duration: 0.3s;" +
                "    animation-fill-mode: forwards;" +
                "}" +
                "@keyframes becoming-red {" +
                "    from {" +
                "        background-color: #c4c4c4;" +
                "        color: black;" +
                "    }" +
                "    to {" +
                "        background-color: #ed3636;" +
                "        color: white;" +
                "    }" +
                "}" +
                "div.gray {" +
                "    background-color: #ed3636;" +
                "    color: white;" +
                "    animation-name: becoming-gray;" +
                "    animation-duration: 0.3s;" +
                "    animation-fill-mode: forwards;" +
                "}" +
                "@keyframes becoming-gray {" +
                "    from {" +
                "        background-color: #ed3636;" +
                "        color: white;" +
                "    }" +
                "    to {" +
                "        background-color: #c4c4c4;" +
                "        color: black;" +
                "    }" +
                "}" +
                "span {" +
                "    position: absolute;" +
                "    top: 20%;" +
                "    left: 20%;" +
                "    height: 60%;" +
                "    width: 60%;" +
                "    font-size: 37px !important;" +
                "    font-weight: 150 !important;" +
                "    user-select: none;" +
                "}" +
                "";
        this.shadowRoot.appendChild(style);
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
        this.shadowRoot.appendChild(link);
    }
    createElements() {
        const div = document.createElement("div");
        const span = document.createElement("span");
        span.innerHTML = "close";
        div.appendChild(span);
        this.shadowRoot.appendChild(div);
        span.classList.add("material-symbols-outlined");
    }
    setEvents() {
        const classList = this.shadowRoot.querySelector("div").classList;
        this.addEventListener("mouseover", function (event) {
            classList.add("red");
            if (classList.contains("gray")) {
                classList.remove("gray");
            }
        });
        this.addEventListener("mouseleave", function (event) {
            classList.add("gray");
            if (classList.contains("red")) {
                classList.remove("red");
            }
        });
        this.addEventListener("mousedown", function (event) {
            this._notification.close();
        });
    }
}
window.customElements.define("notification-close", HTMLNotificationCloseElement);
//# sourceMappingURL=HTMLNotificationCloseElement.js.map
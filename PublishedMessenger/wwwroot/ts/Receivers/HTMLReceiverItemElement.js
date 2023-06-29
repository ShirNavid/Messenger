export class HTMLReceiverItemElement extends HTMLElement {
    constructor(receiverList, accountData) {
        super();
        this.attachShadow({ mode: 'open' });
        this._receiverList = receiverList;
        this._accountData = accountData;
        this.setReceiverItemElement();
    }
    setReceiverItemElement() {
        this.setReceiverItemStyle();
        this.createReceiverItemElements();
        this.setReceiverItemEvents();
    }
    setReceiverItemStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.borderRadius = "20px";
        this.style.marginRight = "10px";
        this.style.fontSize = "14px";
        this.style.height = "25px";
        this.style.backgroundColor = "white";
        this.style.color = "black";
        this.style.fontFamily = "system-ui";
        this.style.width = this.getWidth() + 49 + "px";
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
        this.shadowRoot.appendChild(link);
        const style = document.createElement("style");
        style.innerHTML =
            "img {" +
                "    position: absolute;" +
                "    height: 25px;" +
                "    width: 25px;" +
                "    border-radius: 25px;" +
                "    z-index: 11;" +
                "}" +
                "span {" +
                "    position: absolute;" +
                "    display: inline-block;" +
                "    height: 25px;" +
                "    width: 25px;" +
                "    border-radius: 25px;" +
                "    z-index: 12;" +
                "    user-select: none;" +
                "    opacity: 0;" +
                "}" +
                "span.material-symbols-outlined {" +
                "    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;" +
                "}" +
                "span.showing {" +
                "    animation-name: show-span;" +
                "    animation-duration: 0.3s;" +
                "    animation-fill-mode: forwards;" +
                "}" +
                "@keyframes show-span {" +
                "    from {" +
                "        opacity: 0;" +
                "    }" +
                "    to {" +
                "        opacity: 1;" +
                "    }" +
                "}" +
                "span.hiding {" +
                "    animation-name: hide-span;" +
                "    animation-duration: 0.3s;" +
                "    animation-fill-mode: forwards;" +
                "}" +
                "@keyframes hide-span {" +
                "    from {" +
                "        opacity: 1;" +
                "    }" +
                "    to {" +
                "        opacity: 0;" +
                "    }" +
                "}" +
                "text {" +
                "    position: absolute;" +
                "    display: inline-block;" +
                "    left: 12px;" +
                "    padding-left: 23px;" +
                "    z-index: 10;" +
                "    top: 2px;" +
                "}" +
                "";
        this.shadowRoot.appendChild(style);
    }
    createReceiverItemElements() {
        const img = document.createElement("img");
        this.shadowRoot.appendChild(img);
        img.src = "data:image/jpeg;base64," + this._accountData.image;
        const span = document.createElement("span");
        span.classList.add("material-symbols-outlined");
        span.innerHTML = "close";
        this.shadowRoot.appendChild(span);
        const text = document.createElement("text");
        text.innerHTML = this._accountData.text;
        this.shadowRoot.appendChild(text);
    }
    getWidth() {
        const text = document.createElement("text");
        this._receiverList.shadowRoot.appendChild(text);
        text.innerHTML = this._accountData.text;
        const width = text.offsetWidth;
        text.remove();
        return width;
    }
    setReceiverItemEvents() {
        const receiverItem = this;
        const span = this.shadowRoot.querySelector("span");
        span.addEventListener("mouseover", function () {
            const isFixed = receiverItem.classList.contains("fixed");
            if (isFixed == false) {
                if (span.classList.contains("hiding")) {
                    span.classList.remove("hiding");
                }
                span.classList.add("showing");
            }
        });
        span.addEventListener("mouseleave", function () {
            const isFixed = receiverItem.classList.contains("fixed");
            if (isFixed == false) {
                if (span.classList.contains("showing")) {
                    span.classList.remove("showing");
                }
                span.classList.add("hiding");
            }
        });
        span.addEventListener("mousedown", function () {
            const isFixed = receiverItem.classList.contains("fixed");
            if (isFixed == false) {
                receiverItem._receiverList.removeReceiverItem(receiverItem);
            }
        });
    }
    getAccountData() {
        return this._accountData;
    }
}
//# sourceMappingURL=HTMLReceiverItemElement.js.map
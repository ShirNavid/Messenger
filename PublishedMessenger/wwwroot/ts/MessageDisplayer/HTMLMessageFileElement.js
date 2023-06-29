export class HTMLMessageFileElement extends HTMLElement {
    constructor(message, messageFileId, messageName, isSenderMe) {
        super();
        this.attachShadow({ mode: 'open' });
        this._message = message;
        this._messageFileId = messageFileId;
        this._messageName = messageName;
        this._isSenderMe = isSenderMe;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }
    setStyle() {
        if (this._messageFileId == 0) {
            this.style.display = "none";
        }
        else {
            this.style.display = "block";
        }
        this.style.position = "relative";
        this.style.overflow = "hidden";
        this.style.padding = "0px 12px";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.borderColor = (this._isSenderMe) ? "rgb(220, 220, 220)" : "rgb(15, 84, 140)";
        this.style.backgroundColor = "transparent";
        this.style.float = "right";
        this.style.marginRight = "15px";
        this.style.borderRadius = "1000px";
        this.style.cursor = "pointer";
        this.style.userSelect = "none";
        const style = document.createElement("style");
        style.innerHTML =
            "text {" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    overflow: hidden;" +
                "}" +
                "span {" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    overflow: hidden;" +
                "    margin-left: 5px;" +
                "}" +
                "a {" +
                "    position: relative;" +
                "    display: none;" +
                "    overflow: hidden;" +
                "}" +
                "";
        this.shadowRoot.appendChild(style);
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
        this.shadowRoot.appendChild(link);
    }
    createElements() {
        const text = document.createElement("text");
        this.shadowRoot.appendChild(text);
        text.innerHTML = this._messageName;
        const span = document.createElement("span");
        this.shadowRoot.appendChild(span);
        span.innerHTML = "download";
        span.classList.add("material-symbols-outlined");
        const a = document.createElement("a");
        this.shadowRoot.appendChild(a);
        a.href = "Downloads?id=" + String(this._messageFileId);
    }
    setEvents() {
        this.addEventListener("mouseover", function (event) {
            this.style.backgroundColor = (this._isSenderMe) ? "rgb(220, 220, 220)" : "rgb(15, 84, 140)";
        });
        this.addEventListener("mouseleave", function (event) {
            this.style.backgroundColor = "transparent";
        });
        this.addEventListener("click", function (event) {
            const a = this.shadowRoot.querySelector("a");
            a.click();
        });
    }
}
window.customElements.define("message-file", HTMLMessageFileElement);
//# sourceMappingURL=HTMLMessageFileElement.js.map
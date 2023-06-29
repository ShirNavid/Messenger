import { HTMLMessageElement } from "./HTMLMessageElement.js";

export class HTMLMessageFileElement extends HTMLElement {

    private readonly _message: HTMLMessageElement;
    private readonly _messageFileId: number;
    private readonly _messageName: string;
    private readonly _isSenderMe: boolean;

    constructor(message: HTMLMessageElement, messageFileId: number, messageName: string, isSenderMe: boolean) {
        super();

        this.attachShadow({ mode: 'open' });

        this._message = message;
        this._messageFileId = messageFileId;
        this._messageName = messageName;
        this._isSenderMe = isSenderMe;

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }

    private setStyle(): void {
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

    private createElements(): void {
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

    private setEvents(): void {
        this.addEventListener("mouseover", function (this: HTMLMessageFileElement, event: MouseEvent) {
            this.style.backgroundColor = (this._isSenderMe) ? "rgb(220, 220, 220)" : "rgb(15, 84, 140)";
        });
        this.addEventListener("mouseleave", function (this: HTMLMessageFileElement, event: MouseEvent) {
            this.style.backgroundColor = "transparent";
        });
        this.addEventListener("click", function (this: HTMLMessageFileElement, event: MouseEvent) {
            const a = this.shadowRoot.querySelector("a");
            a.click();
        });
    }

}

window.customElements.define("message-file", HTMLMessageFileElement);

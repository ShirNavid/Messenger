import { HTMLSelectAccountItemElement } from "./HTMLSelectAccountItemElement.js";

export class HTMLSelectAccountItemTextElement extends HTMLElement {

    private readonly _selectAccountItem: HTMLSelectAccountItemElement;
    private readonly _text: string;

    constructor(selectAccountItem: HTMLSelectAccountItemElement, text: string) {
        super();

        this.attachShadow({ mode: 'open' });

        this._selectAccountItem = selectAccountItem;
        this._text = text;

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
        this.setEvent();
    }

    private setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.left = "0px";
        this.style.width = "251px";
        this.style.height = "100%";

        const style = document.createElement("style");
        style.innerHTML =
            "text {" +
            "    position: absolute;" +
            "    display: inline-block;" +
            "    top: 5px;" +
            "    font-size: 13px;" +
            "    left: 20px;" +
            "    user-select: none;" +
            "}";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        const text = document.createElement("text");
        text.innerHTML = this._text;
        this.shadowRoot.appendChild(text);
    }

    private setEvent(): void {
        this.addEventListener("mouseover", function (this: HTMLSelectAccountItemTextElement, event: MouseEvent) {
            this._selectAccountItem.runMouseOverEvent();
        });

        this.addEventListener("mouseleave", function (this: HTMLSelectAccountItemTextElement, event: MouseEvent) {
            this._selectAccountItem.runMouseLeaveEvent();
        });

        this.addEventListener("mousedown", function (this: HTMLSelectAccountItemTextElement, event: MouseEvent) {
            this._selectAccountItem.setValue();
            this._selectAccountItem.close();
        });
    }

    public runMouseOverEvent(): void {
        this.style.backgroundColor = "rgb(250, 250, 250)";
    }

    public runMouseLeaveEvent(): void {
        this.style.backgroundColor = "white";
    }

}

window.customElements.define("select-account-item-text", HTMLSelectAccountItemTextElement)

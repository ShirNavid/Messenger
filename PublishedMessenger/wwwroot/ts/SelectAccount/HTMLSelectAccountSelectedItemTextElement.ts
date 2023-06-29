import { HTMLSelectAccountSelectedItemElement } from "./HTMLSelectAccountSelectedItemElement.js";

export class HTMLSelectAccountSelectedItemTextElement extends HTMLElement {

    private readonly _selectAccountSelectedItem: HTMLSelectAccountSelectedItemElement;

    constructor(selectAccountSelectedItem: HTMLSelectAccountSelectedItemElement, text: string) {
        super();

        this.attachShadow({ mode: 'open' });

        this._selectAccountSelectedItem = selectAccountSelectedItem;

        this.setElement(text);
    }

    private setElement(text: string): void {
        this.setStyle();
        this.createElements(text);
        this.setEvent();
    }

    private setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.left = "0px";
        this.style.width = "251px";
        this.style.height = "100%";
        this.style.color = "white";

        const style = document.createElement("style");
        style.innerHTML =
            "text {" +
            "    position: absolute;" +
            "    display: inline-block;" +
            "    top: 4px;" +
            "    left: 20px;" +
            "    user-select: none;" +
            "}";
        this.shadowRoot.appendChild(style);
    }

    private createElements(text: string): void {
        const textElement = document.createElement("text");
        if (text != null) {
            textElement.innerHTML = text;
        }
        this.shadowRoot.appendChild(textElement);
    }

    private setEvent(): void {
        this.addEventListener("mousedown", function (this: HTMLSelectAccountSelectedItemTextElement, event: MouseEvent) {
            this._selectAccountSelectedItem.changeListStatus();
        });
    }

    public setValue(text: string): void {
        this.shadowRoot.querySelector("text").innerHTML = text;
    }

}

window.customElements.define("select-account-selected-item-text", HTMLSelectAccountSelectedItemTextElement)


import { HTMLSelectAccountItemElement } from "./HTMLSelectAccountItemElement.js";

export class HTMLSelectAccountItemImageElement extends HTMLElement {

    private readonly _selectAccountItem: HTMLSelectAccountItemElement;

    constructor(selectAccountItem: HTMLSelectAccountItemElement, image: string) {
        super();

        this.attachShadow({ mode: 'open' });

        this._selectAccountItem = selectAccountItem;

        this.setElement(image);
    }

    private setElement(image: string): void {
        this.setStyle();
        this.createElements(image);
        this.setEvent();
    }

    private setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.right = "0px";
        this.style.width = "49px";
        this.style.height = "100%";

        const style = document.createElement("style");
        style.innerHTML =
            "img {" +
            "    position: absolute;" +
            "    display: inline-flex;" +
            "    width: 25px;" +
            "    top: 2px;" +
            "    border-radius: 50%;" +
            "}";

        this.shadowRoot.appendChild(style);

    }

    private createElements(image: string): void {
        const img = document.createElement("img");
        img.src = "data:image/jpeg;base64," + image;
        this.shadowRoot.appendChild(img);
    }

    private setEvent(): void {
        this.addEventListener("mouseover", function (this: HTMLSelectAccountItemImageElement, event: MouseEvent) {
            this._selectAccountItem.runMouseOverEvent();
        });

        this.addEventListener("mouseleave", function (this: HTMLSelectAccountItemImageElement, event: MouseEvent) {
            this._selectAccountItem.runMouseLeaveEvent();
        });

        this.addEventListener("mousedown", function (this: HTMLSelectAccountItemImageElement, event: MouseEvent) {
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

window.customElements.define("select-account-item-image", HTMLSelectAccountItemImageElement)
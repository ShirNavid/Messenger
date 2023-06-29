import { CellBase } from "./CellBase.js";
import { HTMLHeadRowElement } from "./HTMLHeadRowElement.js";

export class HTMLHeadCellElement extends CellBase {

    private readonly _row: HTMLHeadRowElement;
    private readonly _index: number;
    private readonly _text: string;

    private _order: boolean;

    constructor(row: HTMLHeadRowElement, index: number, text: string) {
        super();

        this._row = row;
        this._index = index;
        this._text = text;

        this._order = null;

        this.setElement();
    }

    private setElement(): void {
        this.createStyle();
        this.createElements();
        this.setEvent();
    }

    private createStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "25px";
        this.style.width = "150px";

        const style = document.createElement("style");
        style.innerHTML =
            "div {" +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    width: 100%;" +
            "    height: 100%;" +
            "}" +
            "text.text {" +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    top: 50%;" +
            "    transform: translateY(-50%);" +
            "    margin-left: 10px;" +
            "    user-select: none;" +
            "}";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        const div = document.createElement("div");
        this.shadowRoot.appendChild(div);
        const text = document.createElement("text");
        div.appendChild(text);
        text.innerText = this._text;
        text.classList.add("text");
        const arrowText = document.createElement("text");
        div.appendChild(arrowText);
        arrowText.classList.add("arrow-text");
        arrowText.innerText = "";
    }

    private setEvent(): void {
        this.addEventListener("mousedown", function (this: HTMLHeadCellElement, event: MouseEvent) {
            const arrowText = this.shadowRoot.querySelector("text.arrow-text");
            if (this._order == null) {
                this._order = true;
                arrowText.innerHTML = "&#x25BE";

            }
            else if (this._order == true) {
                this._order = false;
                arrowText.innerHTML = "&#x25B4;";
            }
            else {
                this._order = null;
                arrowText.innerHTML = "";
            }

            this._row.setOrder();
        });
    }

    public getIndex(): number {
        return this._index;
    }

    public getOrder(): boolean {
        return this._order;
    }

}

window.customElements.define("head-cell", HTMLHeadCellElement);

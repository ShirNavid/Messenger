import { CellBase } from "./CellBase.js";
import { HTMLHeadRowElement } from "./HTMLHeadRowElement.js";

export class HTMLHeadHasBeenSeenCellElement extends CellBase {

    private readonly _row: HTMLHeadRowElement;
    private readonly _index: number;

    private _order: boolean;

    constructor(row: HTMLHeadRowElement, index: number) {
        super();

        this._row = row;
        this._index = index;

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
        this.style.width = "calc(100% - (60px) - (" + ((this._row.getColumnsCount() - 3)).toString() + " * 155px) - (60px))";

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
        text.innerText = "HasBeenSeen";
        text.classList.add("text");
        const arrowText = document.createElement("text");
        div.appendChild(arrowText);
        arrowText.classList.add("arrow-text");
        arrowText.innerText = "";
    }

    private setEvent(): void {
        this.addEventListener("mousedown", function (this: HTMLHeadHasBeenSeenCellElement, event: MouseEvent) {
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

window.customElements.define("head-has-been-seen-cell", HTMLHeadHasBeenSeenCellElement);


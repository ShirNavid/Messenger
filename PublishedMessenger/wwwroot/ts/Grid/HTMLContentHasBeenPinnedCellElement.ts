import { CellBase } from "./CellBase.js";
import { HTMLContentRowElement } from "./HTMLContentRowElement.js";

export class HTMLContentHasBeenPinnedCellElement extends CellBase {

    private readonly _row: HTMLContentRowElement;
    private readonly _index: number;
    private readonly _value: any;

    constructor(row: HTMLContentRowElement, index: number, value: boolean) {
        super();

        this._row = row;
        this._index = index;
        this._value = value;

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
        this.style.height = "37px";
        this.style.userSelect = "none";
        this.style.width = this._row.getWidth(this._index);

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
        this.shadowRoot.appendChild(link);

        const style = document.createElement("style");
        style.innerHTML =
            "div {" +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    width: 100%;" +
            "    height: 100%;" +
            "}" +
            "span.material-symbols-outlined {" +
            "    position: relative;" +
            "    display: inline-block !important;" +
            "    color: #b6b6b6;" +
            "    overflow: hidden;" +
            "    top: 50%;" +
            "    transform: translateY(-50%);" +
            "    margin-left: 10px;" +
            "    font-variation-settings:" +
            "    'FILL' 0," +
            "    'wght' 400," +
            "    'GRAD' 0," +
            "    'opsz' 48" +
            "}";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        const span = this.getSpan();
        const div = document.createElement("div");
        div.appendChild(span);
        this.shadowRoot.appendChild(div);
    }

    private getSpan(): HTMLSpanElement {
        const span = document.createElement("span");
        if (this._value) {
            span.classList.add("material-symbols-outlined");
            span.innerHTML = "push_pin";
        }
        return span;
    }

    private setEvent(): void {
        this.addEventListener("mouseover", function (this: HTMLContentHasBeenPinnedCellElement, event: MouseEvent) {
            this._row.mouseOverEvent();
        });
        this.addEventListener("mouseleave", function (this: HTMLContentHasBeenPinnedCellElement, event: MouseEvent) {
            this._row.mouseLeaveEvent();
        });
        this.addEventListener("mousedown", function (this: HTMLContentHasBeenPinnedCellElement, event: MouseEvent) {
            const isCtrlPressed = event.ctrlKey;
            this._row.mouseDownEvent(isCtrlPressed);
        });
    }

    public getIndex(): number {
        return this._index;
    }

    public mouseOverEvent(): void {
        this.style.backgroundColor = "rgb(250, 250, 250)";
    }

    public mouseLeaveEvent(): void {
        this.style.backgroundColor = "transparent";
    }

    public mouseDownEvent(isSelected: boolean): void {
        if (isSelected == true) {
            this.style.backgroundColor = "rgb(206, 227, 249)";
        }
        else {
            this.style.backgroundColor = "transparent";
        }
    }

}

window.customElements.define("content-has-been-pinned-cell", HTMLContentHasBeenPinnedCellElement);


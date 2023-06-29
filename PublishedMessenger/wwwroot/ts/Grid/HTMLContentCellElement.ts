import { CellBase } from "./CellBase.js";
import { HTMLContentRowElement } from "./HTMLContentRowElement.js";

export class HTMLContentCellElement extends CellBase {

    private readonly _row: HTMLContentRowElement;
    private readonly _index: number;
    private readonly _text: string;

    constructor(row: HTMLContentRowElement, index: number, text: string) {
        super();

        this._row = row;
        this._index = index;
        this._text = text;

        this.setElement();
    }

    private setElement(): void {
        this.createElements();
        this.createStyle();
        this.setEvent();
    }

    private createStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "37px";
        this.style.userSelect = "none";
        this.style.width = this._row.getWidth(this._index);

        const style = document.createElement("style");
        style.innerHTML =
            "div {" +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    width: 100%;" +
            "    height: 100%;" +
            "}" +
            "text {" +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    top: 50%;" +
            "    transform: translateY(-50%);" +
            "    margin-left: 10px;" +
            "    height: 18px;" +
            "}";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        const text = document.createElement("text");
        text.innerText = this._text;
        const div = document.createElement("div");
        div.appendChild(text);
        this.shadowRoot.appendChild(div);
    }

    private setEvent(): void {
        this.addEventListener("mouseover", function (this: HTMLContentCellElement, event: MouseEvent) {
            this._row.mouseOverEvent();
        });
        this.addEventListener("mouseleave", function (this: HTMLContentCellElement, event: MouseEvent) {
            this._row.mouseLeaveEvent();
        });
        this.addEventListener("mousedown", function (this: HTMLContentCellElement, event: MouseEvent) {
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

window.customElements.define("content-cell", HTMLContentCellElement);


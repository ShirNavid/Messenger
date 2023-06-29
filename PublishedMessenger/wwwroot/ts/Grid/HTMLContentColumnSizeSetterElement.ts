import { CellBase } from "./CellBase.js";
import { ColumnSizeSetterBase } from "./ColumnSizeSetterBase.js";
import { HTMLContentRowElement } from "./HTMLContentRowElement.js";

export class HTMLContentColumnSizeSetterElement extends ColumnSizeSetterBase {

    constructor(contentRow: HTMLContentRowElement, previousCell: CellBase, nextCell: CellBase) {
        super(contentRow, previousCell, nextCell);

        this.setElement();
    }

    private setElement(): void {
        this.createStyle();
        this.createElements();
        this.setEvent();
    }

    private createStyle(): void {
        this.style.height = "37px";
    }

    private createElements(): void {
    }

    private setEvent(): void {
        this.addEventListener("mouseover", function (this: HTMLContentColumnSizeSetterElement, event: MouseEvent) {
            (this._row as HTMLContentRowElement).mouseOverEvent();
        });
        this.addEventListener("mouseleave", function (this: HTMLContentColumnSizeSetterElement, event: MouseEvent) {
            (this._row as HTMLContentRowElement).mouseLeaveEvent();
        });
        this.addEventListener("mousedown", function (this: HTMLContentColumnSizeSetterElement, event: MouseEvent) {
            const isCtrlPressed = event.ctrlKey;
            (this._row as HTMLContentRowElement).mouseDownEvent(isCtrlPressed);
        });
    }

    public setRowOver(): void {
        this.style.backgroundColor = "rgb(250, 250, 250)"
    }

    public setRowLeave(): void {
        this.style.backgroundColor = "#FFFFFF";
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

window.customElements.define("content-column-size-setter", HTMLContentColumnSizeSetterElement);

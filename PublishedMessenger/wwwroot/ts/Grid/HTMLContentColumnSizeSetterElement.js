import { ColumnSizeSetterBase } from "./ColumnSizeSetterBase.js";
export class HTMLContentColumnSizeSetterElement extends ColumnSizeSetterBase {
    constructor(contentRow, previousCell, nextCell) {
        super(contentRow, previousCell, nextCell);
        this.setElement();
    }
    setElement() {
        this.createStyle();
        this.createElements();
        this.setEvent();
    }
    createStyle() {
        this.style.height = "37px";
    }
    createElements() {
    }
    setEvent() {
        this.addEventListener("mouseover", function (event) {
            this._row.mouseOverEvent();
        });
        this.addEventListener("mouseleave", function (event) {
            this._row.mouseLeaveEvent();
        });
        this.addEventListener("mousedown", function (event) {
            const isCtrlPressed = event.ctrlKey;
            this._row.mouseDownEvent(isCtrlPressed);
        });
    }
    setRowOver() {
        this.style.backgroundColor = "rgb(250, 250, 250)";
    }
    setRowLeave() {
        this.style.backgroundColor = "#FFFFFF";
    }
    mouseOverEvent() {
        this.style.backgroundColor = "rgb(250, 250, 250)";
    }
    mouseLeaveEvent() {
        this.style.backgroundColor = "transparent";
    }
    mouseDownEvent(isSelected) {
        if (isSelected == true) {
            this.style.backgroundColor = "rgb(206, 227, 249)";
        }
        else {
            this.style.backgroundColor = "transparent";
        }
    }
}
window.customElements.define("content-column-size-setter", HTMLContentColumnSizeSetterElement);
//# sourceMappingURL=HTMLContentColumnSizeSetterElement.js.map
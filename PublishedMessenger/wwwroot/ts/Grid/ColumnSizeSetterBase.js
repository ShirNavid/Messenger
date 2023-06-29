export class ColumnSizeSetterBase extends HTMLElement {
    constructor(row, previousCell, nextCell) {
        super();
        this.attachShadow({ mode: "open" });
        this._row = row;
        this._previousCell = previousCell;
        this._nextCell = nextCell;
        this.setElementBase();
    }
    setElementBase() {
        this.createStyleBase();
    }
    createStyleBase() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.width = "5px";
        this.style.backgroundColor = "#FFFFFF";
    }
    sendLenght(dx) {
        this._row.sendLenght(this, dx);
    }
    addLenght(dx) {
        this._previousCell.addWidth(dx);
        this._nextCell.addWidth(-dx);
    }
}
//# sourceMappingURL=ColumnSizeSetterBase.js.map
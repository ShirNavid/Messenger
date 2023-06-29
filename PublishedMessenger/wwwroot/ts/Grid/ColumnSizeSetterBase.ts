import { CellBase } from "./CellBase.js";
import { RowBase } from "./RowBase.js";

export class ColumnSizeSetterBase extends HTMLElement {

    protected readonly _row: RowBase;
    protected readonly _previousCell: CellBase;
    protected readonly _nextCell: CellBase;

    constructor(row: RowBase, previousCell: CellBase, nextCell: CellBase) {
        super();

        this.attachShadow({ mode: "open" });

        this._row = row;
        this._previousCell = previousCell;
        this._nextCell = nextCell;

        this.setElementBase();
    }

    private setElementBase(): void {
        this.createStyleBase();
    }

    private createStyleBase(): void {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.width = "5px";
        this.style.backgroundColor = "#FFFFFF";
    }

    public sendLenght(dx: number): void {
        this._row.sendLenght(this, dx);
    }

    public addLenght(dx: number): void {
        this._previousCell.addWidth(dx);
        this._nextCell.addWidth(-dx);
    }

}
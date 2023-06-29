import { HTMLHeadColumnSizeSetterElement } from "./HTMLHeadColumnSizeSetterElement.js";
import { HTMLGridElement } from "./HTMLGridElement.js";
import { HTMLHeadCellElement } from "./HTMLHeadCellElement.js";
import { RowBase } from "./RowBase.js";
import { HTMLHeadImageCellElement } from "./HTMLHeadImageCellElement.js";
import { KeyValuePair } from "../GeneralClasses/KeyValuePair.js";
import { HTMLHeadHasBeenSeenCellElement } from "./HTMLHeadHasBeenSeenCellElement.js";
import { HTMLHeadHasBeenPinnedCellElement } from "./HTMLHeadHasBeenPinnedCellElement.js";
import { CellBase } from "./CellBase.js";

export class HTMLHeadRowElement extends RowBase {

    private readonly _columnNames: string[];
    private readonly _imageCell: HTMLHeadImageCellElement;
    private readonly _cells: HTMLHeadCellElement[];
    private readonly _hasBeenSeenCell: HTMLHeadHasBeenSeenCellElement;
    private readonly _hasBeenPinnedCell: HTMLHeadHasBeenPinnedCellElement;
    private readonly _columnSizeSetters: HTMLHeadColumnSizeSetterElement[];

    constructor(grid: HTMLGridElement, columnNames: string[]) {
        super(grid);

        this._columnNames = columnNames;
        this._imageCell = this.getImageCell();
        this._cells = this.getCells();
        this._hasBeenSeenCell = this.getHasBeenSeenCell();
        this._hasBeenPinnedCell = this.getHasBeenPinnedCell();
        this._columnSizeSetters = this.getColumnSizeSetters();

        this.setElement();
    }

    private getImageCell(): HTMLHeadImageCellElement {
        const imageCell = new HTMLHeadImageCellElement(this);
        return imageCell;
    }

    private getCells(): HTMLHeadCellElement[] {
        const cells = this._columnNames.filter(c => c != "Image").map((c, i) => new HTMLHeadCellElement(this, i+1, c));
        return cells;
    }

    private getHasBeenSeenCell(): HTMLHeadHasBeenSeenCellElement {
        const hasBeenSeenCell = new HTMLHeadHasBeenSeenCellElement(this, this._cells.length + 1);
        return hasBeenSeenCell;
    }

    private getHasBeenPinnedCell(): HTMLHeadHasBeenPinnedCellElement {
        const hasBeenPinnedCell = new HTMLHeadHasBeenPinnedCellElement(this, this._cells.length + 2);
        return hasBeenPinnedCell;
    }

    private getColumnSizeSetters(): HTMLHeadColumnSizeSetterElement[] {
        const sizeSetters = new Array<HTMLHeadColumnSizeSetterElement>();
        for (let i = 0; i < this._cells.length; i++) {
            const previousCell = this._cells[i];
            const nextCell = (i != this._cells.length - 1) ? this._cells[i + 1] : this._hasBeenSeenCell;
            const sizeSetter = new HTMLHeadColumnSizeSetterElement(this, previousCell, nextCell);
            sizeSetters.push(sizeSetter);
        }
        return sizeSetters;
    }

    private setElement(): void {
        this.createStyle();
        this.createElements();
    }

    private createStyle(): void {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.width = "100%";
        this.style.height = "25px";
    }

    private createElements(): void {
        this.shadowRoot.appendChild(this._imageCell);
        for (let i = 0; i < this._cells.length; i++) {
            let cell = this._cells[i];
            this.shadowRoot.appendChild(cell);

            const columnSizeSetter = this._columnSizeSetters[i];
            this.shadowRoot.appendChild(columnSizeSetter);
        }
        this.shadowRoot.appendChild(this._hasBeenSeenCell);
        this.shadowRoot.appendChild(this._hasBeenPinnedCell);
    }

    public getColumnsCount(): number {
        return this._cells.length + 3;
    }

    public getWidth(index: number): string {
        const reformedIndex = index - 1;
        let cell: CellBase;
        if (reformedIndex < this._cells.length) {
            cell = this._cells[reformedIndex];
        }
        else if (reformedIndex == this._cells.length) {
            cell = this._hasBeenSeenCell;
        }
        else {
            cell = this._hasBeenPinnedCell;
        }
        const width = cell.style.width;
        return width;
    }

    public setOrder(): void {
        const columnsOrder = new Array<KeyValuePair<string, boolean>>();
        const columnNames = this._columnNames;
        for (let i = 0; i < columnNames.length + 1; i++) {
            let columnName: string;
            let cell: HTMLHeadCellElement | HTMLHeadHasBeenSeenCellElement;
            if (i < columnNames.length) {
                columnName = this._columnNames[i];
                cell = this._cells[i];
            }
            else {
                columnName = "HasBeenSeen";
                cell = this._hasBeenSeenCell;
            }
            const order = cell.getOrder();
            if (order != null) {
                columnsOrder.push(new KeyValuePair<string, boolean>(columnName, order));
            }
        }
        this._grid.setOrder(columnsOrder);
    }

}

window.customElements.define("head-row", HTMLHeadRowElement);

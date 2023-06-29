import { HTMLHeadColumnSizeSetterElement } from "./HTMLHeadColumnSizeSetterElement.js";
import { HTMLHeadCellElement } from "./HTMLHeadCellElement.js";
import { RowBase } from "./RowBase.js";
import { HTMLHeadImageCellElement } from "./HTMLHeadImageCellElement.js";
import { KeyValuePair } from "../GeneralClasses/KeyValuePair.js";
import { HTMLHeadHasBeenSeenCellElement } from "./HTMLHeadHasBeenSeenCellElement.js";
import { HTMLHeadHasBeenPinnedCellElement } from "./HTMLHeadHasBeenPinnedCellElement.js";
export class HTMLHeadRowElement extends RowBase {
    constructor(grid, columnNames) {
        super(grid);
        this._columnNames = columnNames;
        this._imageCell = this.getImageCell();
        this._cells = this.getCells();
        this._hasBeenSeenCell = this.getHasBeenSeenCell();
        this._hasBeenPinnedCell = this.getHasBeenPinnedCell();
        this._columnSizeSetters = this.getColumnSizeSetters();
        this.setElement();
    }
    getImageCell() {
        const imageCell = new HTMLHeadImageCellElement(this);
        return imageCell;
    }
    getCells() {
        const cells = this._columnNames.filter(c => c != "Image").map((c, i) => new HTMLHeadCellElement(this, i + 1, c));
        return cells;
    }
    getHasBeenSeenCell() {
        const hasBeenSeenCell = new HTMLHeadHasBeenSeenCellElement(this, this._cells.length + 1);
        return hasBeenSeenCell;
    }
    getHasBeenPinnedCell() {
        const hasBeenPinnedCell = new HTMLHeadHasBeenPinnedCellElement(this, this._cells.length + 2);
        return hasBeenPinnedCell;
    }
    getColumnSizeSetters() {
        const sizeSetters = new Array();
        for (let i = 0; i < this._cells.length; i++) {
            const previousCell = this._cells[i];
            const nextCell = (i != this._cells.length - 1) ? this._cells[i + 1] : this._hasBeenSeenCell;
            const sizeSetter = new HTMLHeadColumnSizeSetterElement(this, previousCell, nextCell);
            sizeSetters.push(sizeSetter);
        }
        return sizeSetters;
    }
    setElement() {
        this.createStyle();
        this.createElements();
    }
    createStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.width = "100%";
        this.style.height = "25px";
    }
    createElements() {
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
    getColumnsCount() {
        return this._cells.length + 3;
    }
    getWidth(index) {
        const reformedIndex = index - 1;
        let cell;
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
    setOrder() {
        const columnsOrder = new Array();
        const columnNames = this._columnNames;
        for (let i = 0; i < columnNames.length + 1; i++) {
            let columnName;
            let cell;
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
                columnsOrder.push(new KeyValuePair(columnName, order));
            }
        }
        this._grid.setOrder(columnsOrder);
    }
}
window.customElements.define("head-row", HTMLHeadRowElement);
//# sourceMappingURL=HTMLHeadRowElement.js.map
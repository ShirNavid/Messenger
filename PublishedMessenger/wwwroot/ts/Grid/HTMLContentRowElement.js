import { HTMLContentCellElement } from "./HTMLContentCellElement.js";
import { HTMLContentColumnSizeSetterElement } from "./HTMLContentColumnSizeSetterElement.js";
import { HTMLContentHasBeenPinnedCellElement } from "./HTMLContentHasBeenPinnedCellElement.js";
import { HTMLContentHasBeenSeenCellElement } from "./HTMLContentHasBeenSeenCellElement.js";
import { HTMLContentImageCellElement } from "./HTMLContentImageCellElement.js";
import { RowBase } from "./RowBase.js";
export class HTMLContentRowElement extends RowBase {
    constructor(grid, gridEntity) {
        super(grid);
        this._gridEntity = gridEntity;
        this._imageCell = this.getImageCell();
        this._cells = this.getCells();
        this._hasBeenSeenCell = this.getHasBeenSeenCell();
        this._hasBeenPinnedCell = this.getHasBeenPinnedCell();
        this._columnSizeSetters = this.getColumnSizeSetters();
        this.isSelected = false;
        this.setElement();
    }
    getImageCell() {
        const image = this._gridEntity.image;
        const imageCell = new HTMLContentImageCellElement(this, image);
        return imageCell;
    }
    getCells() {
        const propKeys = Object.keys(this._gridEntity).filter(c => c != "id" && c != "image" && c != "hasBeenSeen" && c != "hasBeenPinned");
        const propValues = propKeys.map(c => this._gridEntity[c]);
        const cells = propValues.map((c, i) => new HTMLContentCellElement(this, i + 1, c));
        return cells;
    }
    getHasBeenSeenCell() {
        const hasBeenSeen = this._gridEntity.hasBeenSeen;
        const hasBeenSeenCell = new HTMLContentHasBeenSeenCellElement(this, this._cells.length + 1, hasBeenSeen);
        return hasBeenSeenCell;
    }
    getHasBeenPinnedCell() {
        const hasBeenPinned = this._gridEntity.hasBeenPinned;
        const hasBeenPinnedCell = new HTMLContentHasBeenPinnedCellElement(this, this._cells.length + 2, hasBeenPinned);
        return hasBeenPinnedCell;
    }
    getColumnSizeSetters() {
        const sizeSetters = new Array();
        for (let i = 0; i < this._cells.length; i++) {
            const previousCell = this._cells[i];
            const nextCell = (i != this._cells.length - 1) ? this._cells[i + 1] : this._hasBeenSeenCell;
            const sizeSetter = new HTMLContentColumnSizeSetterElement(this, previousCell, nextCell);
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
        this.style.height = "37px";
        this.style.width = "100%";
        this.style.borderBottomStyle = "solid";
        this.style.borderBottomColor = "#F0F0F0";
        this.style.borderBottomWidth = "1px";
    }
    createElements() {
        this.setAttribute("id", this._gridEntity.id.toString());
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
    getWidth(index) {
        const width = this._grid.getWidth(index);
        return width;
    }
    mouseOverEvent() {
        if (this.isSelected == false) {
            this._cells.forEach(c => c.mouseOverEvent());
            this._imageCell.mouseOverEvent();
            this._columnSizeSetters.forEach(c => c.mouseOverEvent());
            this._hasBeenSeenCell.mouseOverEvent();
            ;
            this._hasBeenPinnedCell.mouseOverEvent();
            ;
        }
    }
    mouseLeaveEvent() {
        if (this.isSelected == false) {
            this._cells.forEach(c => c.mouseLeaveEvent());
            this._imageCell.mouseLeaveEvent();
            this._columnSizeSetters.forEach(c => c.mouseLeaveEvent());
            this._hasBeenSeenCell.mouseLeaveEvent();
            this._hasBeenPinnedCell.mouseLeaveEvent();
        }
    }
    mouseDownEvent(isCtrlPressed) {
        if (!isCtrlPressed) {
            this._grid.setRowsUnselected();
        }
        this.isSelected = !this.isSelected;
        this._imageCell.mouseDownEvent(this.isSelected);
        this._cells.forEach(c => c.mouseDownEvent(this.isSelected));
        this._columnSizeSetters.forEach(c => c.mouseDownEvent(this.isSelected));
        this._hasBeenSeenCell.mouseDownEvent(this.isSelected);
        this._hasBeenPinnedCell.mouseDownEvent(this.isSelected);
        this._grid.runSelectionFunctoin();
    }
    setRowUnselected() {
        this.isSelected = false;
        this._imageCell.mouseDownEvent(false);
        this._cells.forEach(c => c.mouseDownEvent(false));
        this._hasBeenSeenCell.mouseDownEvent(false);
        this._hasBeenPinnedCell.mouseDownEvent(false);
        this._columnSizeSetters.forEach(c => c.mouseDownEvent(false));
    }
    getSelectStatus() {
        return this.isSelected;
    }
    getEntity() {
        return this._gridEntity;
    }
}
window.customElements.define("content-row", HTMLContentRowElement);
//# sourceMappingURL=HTMLContentRowElement.js.map
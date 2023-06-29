import { GridEntity } from "../GeneralClasses/GridEntity.js";
import { CellBase } from "./CellBase.js";
import { HTMLContentCellElement } from "./HTMLContentCellElement.js";
import { HTMLContentColumnSizeSetterElement } from "./HTMLContentColumnSizeSetterElement.js";
import { HTMLContentHasBeenPinnedCellElement } from "./HTMLContentHasBeenPinnedCellElement.js";
import { HTMLContentHasBeenSeenCellElement } from "./HTMLContentHasBeenSeenCellElement.js";
import { HTMLContentImageCellElement } from "./HTMLContentImageCellElement.js";
import { HTMLGridElement } from "./HTMLGridElement.js";
import { RowBase } from "./RowBase.js";

export class HTMLContentRowElement extends RowBase {

    private readonly _gridEntity: GridEntity;
    private readonly _imageCell: HTMLContentImageCellElement;
    private readonly _cells: HTMLContentCellElement[];
    private readonly _hasBeenSeenCell: HTMLContentHasBeenSeenCellElement;
    private readonly _hasBeenPinnedCell: HTMLContentHasBeenPinnedCellElement;
    private readonly _columnSizeSetters: HTMLContentColumnSizeSetterElement[];

    private isSelected: boolean;

    constructor(grid: HTMLGridElement, gridEntity: GridEntity) {
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

    private getImageCell(): HTMLContentImageCellElement {
        const image = this._gridEntity.image;
        const imageCell = new HTMLContentImageCellElement(this, image);
        return imageCell;
    }

    private getCells(): HTMLContentCellElement[] {
        const propKeys = Object.keys(this._gridEntity).filter(c => c != "id" && c != "image" && c != "hasBeenSeen" && c != "hasBeenPinned");
        const propValues = propKeys.map(c => this._gridEntity[c]);
        const cells = propValues.map((c, i) => new HTMLContentCellElement(this, i + 1, c));
        return cells;
    }

    private getHasBeenSeenCell(): HTMLContentHasBeenSeenCellElement {
        const hasBeenSeen = this._gridEntity.hasBeenSeen;
        const hasBeenSeenCell = new HTMLContentHasBeenSeenCellElement(this, this._cells.length + 1, hasBeenSeen);
        return hasBeenSeenCell;
    }

    private getHasBeenPinnedCell(): HTMLContentHasBeenPinnedCellElement {
        const hasBeenPinned = this._gridEntity.hasBeenPinned;
        const hasBeenPinnedCell = new HTMLContentHasBeenPinnedCellElement(this, this._cells.length + 2, hasBeenPinned);
        return hasBeenPinnedCell;
    }

    private getColumnSizeSetters(): HTMLContentColumnSizeSetterElement[] {
        const sizeSetters = new Array<HTMLContentColumnSizeSetterElement>();
        for (let i = 0; i < this._cells.length; i++) {
            const previousCell = this._cells[i];
            const nextCell = (i != this._cells.length - 1) ? this._cells[i + 1] : this._hasBeenSeenCell;
            const sizeSetter = new HTMLContentColumnSizeSetterElement(this, previousCell, nextCell);
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
        this.style.height = "37px";
        this.style.width = "100%";
        this.style.borderBottomStyle = "solid";
        this.style.borderBottomColor = "#F0F0F0";
        this.style.borderBottomWidth = "1px";
    }

    private createElements(): void {
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

    public getWidth(index: number): string {
        const width = this._grid.getWidth(index);
        return width;
    }

    public mouseOverEvent(): void {
        if (this.isSelected == false) {
            this._cells.forEach(c => c.mouseOverEvent());
            this._imageCell.mouseOverEvent();
            this._columnSizeSetters.forEach(c => c.mouseOverEvent());
            this._hasBeenSeenCell.mouseOverEvent();;
            this._hasBeenPinnedCell.mouseOverEvent();;
        }
    }

    public mouseLeaveEvent(): void {
        if (this.isSelected == false) {
            this._cells.forEach(c => c.mouseLeaveEvent());
            this._imageCell.mouseLeaveEvent();
            this._columnSizeSetters.forEach(c => c.mouseLeaveEvent());
            this._hasBeenSeenCell.mouseLeaveEvent();
            this._hasBeenPinnedCell.mouseLeaveEvent();
        }
    }

    public mouseDownEvent(isCtrlPressed: boolean): void {
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

    public setRowUnselected(): void {
        this.isSelected = false;
        this._imageCell.mouseDownEvent(false);
        this._cells.forEach(c => c.mouseDownEvent(false));
        this._hasBeenSeenCell.mouseDownEvent(false);
        this._hasBeenPinnedCell.mouseDownEvent(false);
        this._columnSizeSetters.forEach(c => c.mouseDownEvent(false));
    }

    public getSelectStatus(): boolean {
        return this.isSelected;
    }

    public getEntity(): GridEntity {
        return this._gridEntity;
    }

}

window.customElements.define("content-row", HTMLContentRowElement);

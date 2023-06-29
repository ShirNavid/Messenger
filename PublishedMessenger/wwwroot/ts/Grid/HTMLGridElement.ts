import { GridBase } from "./GridBase.js";
import { HTMLHeadRowElement } from "./HTMLHeadRowElement.js";
import { HTMLContentRowElement } from "./HTMLContentRowElement.js";
import { KeyValuePair } from "../GeneralClasses/KeyValuePair.js";
import { GridEntity } from "../GeneralClasses/GridEntity.js";
import { HTMLPagingButtonsGroupElement } from "./HTMLPagingButtonsGroupElement.js";
import { CellBase } from "./CellBase.js";

export class HTMLGridElement extends GridBase {

    private _headRow: HTMLHeadRowElement;
    private _contentRows: HTMLContentRowElement[];

    private _pagingButtonsGroup: HTMLPagingButtonsGroupElement;
    private _selectionFunctoin: string;

    constructor() {
        super();
    }

    public connectedCallback(): void {
        super.connectedCallback();

        this._headRow = new HTMLHeadRowElement(this, this._columnNames);
        this._contentRows = new Array<HTMLContentRowElement>();

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
        this.setEvent();
    }

    private setStyle(): void {
        this.style.backgroundColor = "#FFFFFF";
        this.style.overflowY = "hidden";

        const style = document.createElement("style");
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        this.setGridFrame();
        this.setGridContent();
    }

    private setEvent(): void {
    }

    private setGridFrame(): void {
        this.shadowRoot.appendChild(this._headRow);
    }

    public setGridContent(): void {
        this._contentRows.forEach(c => c.remove());
        this._contentRows = new Array<HTMLContentRowElement>();
        this._rows = this.getRows();
        this._contentRows = this._rows.map(c => new HTMLContentRowElement(this, c));
        this._contentRows.forEach((c, i) => c.style.top = ((-4) * (i + 1)).toString() + "px");
        this._contentRows.forEach(c => this.shadowRoot.appendChild(c));
        this.runSelectionFunctoin();
    }

    public refreshGrid(): void {
        this.setPageNumber(1);
        this.setGridContent();
        this._pagingButtonsGroup.setDataAndCreateElements();
    }

    public getWidth(index: number): string {
        const width = this._headRow.getWidth(index);
        return width;
    }

    public addLenght(index: number, dx: number): void {
        this._headRow.addLenght(index, dx);
        this._contentRows.forEach(c => c.addLenght(index, dx));
    }

    public setSearchedRows(searchedText: string) {
        this.search(searchedText);
        this.setGridContent();
    }

    public setOrder(columnsOrder: KeyValuePair<string, boolean>[]): void {
        this._columnsOrder = columnsOrder;
        this.setColumnsOrder();
        this.setGridContent();
    }

    public setRowsUnselected(): void {
        this._contentRows.forEach(c => c.setRowUnselected());
    }

    public setSelectionFunctoin(selectionFunctoin: string): void {
        const grid = this;
        this._selectionFunctoin = selectionFunctoin;
    }

    public runSelectionFunctoin(): void {
        const grid = this;
        eval(this._selectionFunctoin)
    }

    public getSelectedEntities(): GridEntity[] {
        const entities = this._contentRows.filter(c => c.getSelectStatus()).map(c => c.getEntity());
        return entities;
    }

    public setPagingButtonsGroup(): void {
        this._pagingButtonsGroup = document.querySelector("paging-buttons-group") as HTMLPagingButtonsGroupElement;
    }

    private setNewRows(): void {
        const newRows = this.getRows();
        newRows.forEach(c => this._rows.push(c));
        this.setGridContent();
    }

}

window.customElements.define("web-grid", HTMLGridElement);

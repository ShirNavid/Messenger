import { KeyValuePair } from "../GeneralClasses/KeyValuePair.js"
import { GridManager } from "./GridManager.js"
import { GridEntity } from "../GeneralClasses/GridEntity.js";

export abstract class GridBase extends HTMLElement {

    protected _gridId: string;
    protected _columnNames: string[];
    protected _rows: GridEntity[];
    protected _columnsOrder: KeyValuePair<string, boolean>[];

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    protected connectedCallback(): void {
        this._gridId = this.getAttribute("grid-id");
        this._columnNames = this.getColumnNames();
        this._rows = this.getRows();
        this._columnsOrder = new Array<KeyValuePair<string, boolean>>();
    }

    protected getColumnNames(): string[] {
        const columnNames = GridManager.getColumnNames(this._gridId);
        return columnNames;
    }

    protected setColumnsOrder(): void {
        GridManager.setColumnsOrder(this._gridId, this._columnsOrder);
    }

    protected search(searchedText: string): void {
        GridManager.search(this._gridId, searchedText);
    }

    protected getRows(): GridEntity[] {
        const rows = GridManager.getRows(this._gridId);
        return rows;
    }

    public setPageNumber(pageNumber: number): void {
        GridManager.setPageNumber(this._gridId, pageNumber);
    }

    public getPagesCount(): number {
        const pagesCount = GridManager.getPagesCount(this._gridId);
        return pagesCount;
    }

}


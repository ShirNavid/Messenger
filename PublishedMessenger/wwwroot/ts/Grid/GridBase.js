import { GridManager } from "./GridManager.js";
export class GridBase extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this._gridId = this.getAttribute("grid-id");
        this._columnNames = this.getColumnNames();
        this._rows = this.getRows();
        this._columnsOrder = new Array();
    }
    getColumnNames() {
        const columnNames = GridManager.getColumnNames(this._gridId);
        return columnNames;
    }
    setColumnsOrder() {
        GridManager.setColumnsOrder(this._gridId, this._columnsOrder);
    }
    search(searchedText) {
        GridManager.search(this._gridId, searchedText);
    }
    getRows() {
        const rows = GridManager.getRows(this._gridId);
        return rows;
    }
    setPageNumber(pageNumber) {
        GridManager.setPageNumber(this._gridId, pageNumber);
    }
    getPagesCount() {
        const pagesCount = GridManager.getPagesCount(this._gridId);
        return pagesCount;
    }
}
//# sourceMappingURL=GridBase.js.map
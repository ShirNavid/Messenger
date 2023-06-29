import { getData, runVoidMethod } from "../GeneralClasses/JsToTs.js";
export class GridManager {
    static getColumnNames(gridId) {
        const parameters = { "gridId": gridId };
        const columnNames = getData("GetColumnNames", parameters);
        return columnNames;
    }
    static setColumnsOrder(gridId, columnsOrder) {
        const backendColumnsOrder = columnsOrder.map(c => c.getBackendObject());
        const parameters = { "gridId": gridId, "columnsOrder": backendColumnsOrder };
        runVoidMethod("SetColumnsOrder", parameters);
    }
    static search(gridId, searchedText) {
        const parameters = { "gridId": gridId, "searchedText": searchedText };
        runVoidMethod("Search", parameters);
    }
    static setPageNumber(gridId, pageNumber) {
        const parameters = { "gridId": gridId, "pageNumber": pageNumber };
        runVoidMethod("SetPageNumber", parameters);
    }
    static getPagesCount(gridId) {
        const parameters = { "gridId": gridId };
        const data = getData("GetPagesCount", parameters);
        return data;
    }
    static getRows(gridId) {
        const parameters = { "gridId": gridId };
        const data = getData("GetRows", parameters);
        return data;
    }
}
//# sourceMappingURL=GridManager.js.map
import { getData, runVoidMethod } from "../GeneralClasses/JsToTs.js"
import { GridEntity } from "../GeneralClasses/GridEntity.js"
import { KeyValuePair } from "../GeneralClasses/KeyValuePair.js"

export class GridManager {

    public static getColumnNames(gridId: string): string[] {
        const parameters = { "gridId": gridId };
        const columnNames = getData("GetColumnNames", parameters);
        return columnNames;
    }

    public static setColumnsOrder(gridId: string, columnsOrder: KeyValuePair<string, boolean>[]): void {
        const backendColumnsOrder = columnsOrder.map(c => c.getBackendObject());
        const parameters = { "gridId": gridId, "columnsOrder": backendColumnsOrder };
        runVoidMethod("SetColumnsOrder", parameters);
    }

    public static search(gridId: string, searchedText: string): void {
        const parameters = { "gridId": gridId, "searchedText": searchedText };
        runVoidMethod("Search", parameters);
    }

    public static setPageNumber(gridId: string, pageNumber: number): void {
        const parameters = { "gridId": gridId, "pageNumber": pageNumber };
        runVoidMethod("SetPageNumber", parameters);
    }

    public static getPagesCount(gridId: string): number {
        const parameters = { "gridId": gridId };
        const data = getData("GetPagesCount", parameters);
        return data;
    }

    public static getRows(gridId: string): GridEntity[] {
        const parameters = { "gridId": gridId };
        const data = getData("GetRows", parameters);
        return data;
    }

}
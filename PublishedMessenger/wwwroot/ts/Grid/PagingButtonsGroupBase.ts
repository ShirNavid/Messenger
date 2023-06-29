import { HTMLGridElement } from "./HTMLGridElement.js";

export abstract class PagingButtonsGroupBase extends HTMLElement {

    protected _gridId: string;
    protected _grid: HTMLGridElement;

    protected _pageNumber: number;
    protected _pagesCount: number;

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    protected connectedCallback(): void {
        this._gridId = this.getAttribute("grid-id");
        this._grid = document.querySelector("web-grid[grid-id='" + this._gridId + "']") as HTMLGridElement;

        this.setGrid();

        this.setDataAndCreateElements();
    }

    private setGrid(): void {
        this._grid.setPagingButtonsGroup();
    }

    public setDataAndCreateElements() {
        this._pageNumber = 1;
        this._pagesCount = this.getPagesCount();

        this.setPagingButtons();
    }

    protected setPageNumber(pageNumber: number): void {
        this._grid.setPageNumber(pageNumber);
    }

    protected getPagesCount(): number {
        return this._grid.getPagesCount();
    }

    protected abstract setPagingButtons(): void;

}

export class PagingButtonsGroupBase extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this._gridId = this.getAttribute("grid-id");
        this._grid = document.querySelector("web-grid[grid-id='" + this._gridId + "']");
        this.setGrid();
        this.setDataAndCreateElements();
    }
    setGrid() {
        this._grid.setPagingButtonsGroup();
    }
    setDataAndCreateElements() {
        this._pageNumber = 1;
        this._pagesCount = this.getPagesCount();
        this.setPagingButtons();
    }
    setPageNumber(pageNumber) {
        this._grid.setPageNumber(pageNumber);
    }
    getPagesCount() {
        return this._grid.getPagesCount();
    }
}
//# sourceMappingURL=PagingButtonsGroupBase.js.map
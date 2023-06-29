import { GridBase } from "./GridBase.js";
import { HTMLHeadRowElement } from "./HTMLHeadRowElement.js";
import { HTMLContentRowElement } from "./HTMLContentRowElement.js";
export class HTMLGridElement extends GridBase {
    constructor() {
        super();
    }
    connectedCallback() {
        super.connectedCallback();
        this._headRow = new HTMLHeadRowElement(this, this._columnNames);
        this._contentRows = new Array();
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
        this.setEvent();
    }
    setStyle() {
        this.style.backgroundColor = "#FFFFFF";
        this.style.overflowY = "hidden";
        const style = document.createElement("style");
        this.shadowRoot.appendChild(style);
    }
    createElements() {
        this.setGridFrame();
        this.setGridContent();
    }
    setEvent() {
    }
    setGridFrame() {
        this.shadowRoot.appendChild(this._headRow);
    }
    setGridContent() {
        this._contentRows.forEach(c => c.remove());
        this._contentRows = new Array();
        this._rows = this.getRows();
        this._contentRows = this._rows.map(c => new HTMLContentRowElement(this, c));
        this._contentRows.forEach((c, i) => c.style.top = ((-4) * (i + 1)).toString() + "px");
        this._contentRows.forEach(c => this.shadowRoot.appendChild(c));
        this.runSelectionFunctoin();
    }
    refreshGrid() {
        this.setPageNumber(1);
        this.setGridContent();
        this._pagingButtonsGroup.setDataAndCreateElements();
    }
    getWidth(index) {
        const width = this._headRow.getWidth(index);
        return width;
    }
    addLenght(index, dx) {
        this._headRow.addLenght(index, dx);
        this._contentRows.forEach(c => c.addLenght(index, dx));
    }
    setSearchedRows(searchedText) {
        this.search(searchedText);
        this.setGridContent();
    }
    setOrder(columnsOrder) {
        this._columnsOrder = columnsOrder;
        this.setColumnsOrder();
        this.setGridContent();
    }
    setRowsUnselected() {
        this._contentRows.forEach(c => c.setRowUnselected());
    }
    setSelectionFunctoin(selectionFunctoin) {
        const grid = this;
        this._selectionFunctoin = selectionFunctoin;
    }
    runSelectionFunctoin() {
        const grid = this;
        eval(this._selectionFunctoin);
    }
    getSelectedEntities() {
        const entities = this._contentRows.filter(c => c.getSelectStatus()).map(c => c.getEntity());
        return entities;
    }
    setPagingButtonsGroup() {
        this._pagingButtonsGroup = document.querySelector("paging-buttons-group");
    }
    setNewRows() {
        const newRows = this.getRows();
        newRows.forEach(c => this._rows.push(c));
        this.setGridContent();
    }
}
window.customElements.define("web-grid", HTMLGridElement);
//# sourceMappingURL=HTMLGridElement.js.map
import { CellBase } from "./CellBase.js";
export class HTMLHeadHasBeenPinnedCellElement extends CellBase {
    constructor(row, index) {
        super();
        this._row = row;
        this._index = index;
        this.setElement();
    }
    setElement() {
        this.createStyle();
    }
    createStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "25px";
        this.style.width = "60px";
    }
    getIndex() {
        return this._index;
    }
}
window.customElements.define("head-has-been-pinned-cell", HTMLHeadHasBeenPinnedCellElement);
//# sourceMappingURL=HTMLHeadHasBeenPinnedCellElement.js.map
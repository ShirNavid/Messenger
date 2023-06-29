import { CellBase } from "./CellBase.js";
import { HTMLHeadRowElement } from "./HTMLHeadRowElement.js";

export class HTMLHeadHasBeenPinnedCellElement extends CellBase {

    private readonly _row: HTMLHeadRowElement;
    private readonly _index: number;

    private _order: boolean;

    constructor(row: HTMLHeadRowElement, index: number) {
        super();

        this._row = row;
        this._index = index;

        this.setElement();
    }

    private setElement(): void {
        this.createStyle();
    }

    private createStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "25px";
        this.style.width = "60px";
    }

    public getIndex(): number {
        return this._index;
    }

}

window.customElements.define("head-has-been-pinned-cell", HTMLHeadHasBeenPinnedCellElement);

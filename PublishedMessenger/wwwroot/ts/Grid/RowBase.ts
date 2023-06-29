import { ColumnSizeSetterBase } from "./ColumnSizeSetterBase.js";
import { HTMLGridElement } from "./HTMLGridElement.js";

export abstract class RowBase extends HTMLElement {

    protected readonly _grid: HTMLGridElement;

    constructor(grid: HTMLGridElement) {
        super();

        this._grid = grid;

        this.attachShadow({ mode: "open" });
    }

    public addLenght(index: number, dx: number): void {
        const sizeSetter = this.shadowRoot.querySelectorAll("head-column-size-setter,content-column-size-setter").item(index) as ColumnSizeSetterBase;
        sizeSetter.addLenght(dx);
    }

    public sendLenght(sizeSetter: ColumnSizeSetterBase, dx: number): void {
        const sizeSetters = this.shadowRoot.querySelectorAll("head-column-size-setter,content-column-size-setter");
        let index: number;
        for (let i = 0; i < sizeSetters.length; i++) {
            const item = sizeSetters.item(i) as ColumnSizeSetterBase; 
            if (item == sizeSetter) {
                index = i;
            }
        }
        this._grid.addLenght(index, dx);
    }

}


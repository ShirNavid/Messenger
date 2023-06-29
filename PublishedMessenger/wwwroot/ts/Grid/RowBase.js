export class RowBase extends HTMLElement {
    constructor(grid) {
        super();
        this._grid = grid;
        this.attachShadow({ mode: "open" });
    }
    addLenght(index, dx) {
        const sizeSetter = this.shadowRoot.querySelectorAll("head-column-size-setter,content-column-size-setter").item(index);
        sizeSetter.addLenght(dx);
    }
    sendLenght(sizeSetter, dx) {
        const sizeSetters = this.shadowRoot.querySelectorAll("head-column-size-setter,content-column-size-setter");
        let index;
        for (let i = 0; i < sizeSetters.length; i++) {
            const item = sizeSetters.item(i);
            if (item == sizeSetter) {
                index = i;
            }
        }
        this._grid.addLenght(index, dx);
    }
}
//# sourceMappingURL=RowBase.js.map
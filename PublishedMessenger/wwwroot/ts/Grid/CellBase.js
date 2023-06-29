export class CellBase extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    addWidth(length) {
        const oldWidthString = window.getComputedStyle(this).width;
        const oldWidth = parseInt(oldWidthString.substring(0, oldWidthString.length - 2));
        const newWidth = oldWidth + length;
        const newWidthString = (oldWidth + length).toString() + "px";
        this.style.width = newWidthString;
    }
}
//# sourceMappingURL=CellBase.js.map
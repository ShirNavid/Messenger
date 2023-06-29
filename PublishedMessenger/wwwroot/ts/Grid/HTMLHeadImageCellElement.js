import { CellBase } from "./CellBase.js";
export class HTMLHeadImageCellElement extends CellBase {
    constructor(row) {
        super();
        this._row = row;
        this.setElement();
    }
    setElement() {
        this.createStyle();
        this.createElements();
    }
    createStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "25px";
        this.style.width = "60px";
        const style = document.createElement("style");
        style.innerHTML =
            "div {" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    overflow: hidden;" +
                "    width: 100%;" +
                "    height: 100%;" +
                "}" +
                this.shadowRoot.appendChild(style);
    }
    createElements() {
    }
    getIndex() {
        return 0;
    }
}
window.customElements.define("head-image-cell", HTMLHeadImageCellElement);
//# sourceMappingURL=HTMLHeadImageCellElement.js.map
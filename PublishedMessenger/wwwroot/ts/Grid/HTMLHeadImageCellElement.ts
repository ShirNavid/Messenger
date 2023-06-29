import { CellBase } from "./CellBase.js";
import { HTMLHeadRowElement } from "./HTMLHeadRowElement.js";

export class HTMLHeadImageCellElement extends CellBase {

    private readonly _row: HTMLHeadRowElement;

    constructor(row: HTMLHeadRowElement) {
        super();

        this._row = row;

        this.setElement();
    }

    private setElement(): void {
        this.createStyle();
        this.createElements();
    }

    private createStyle() {
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

    private createElements(): void {
    }

    public getIndex(): number {
        return 0;
    }

}

window.customElements.define("head-image-cell", HTMLHeadImageCellElement);

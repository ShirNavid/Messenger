import { CellBase } from "./CellBase.js";
import { ColumnSizeSetterBase } from "./ColumnSizeSetterBase.js";
import { HTMLHeadRowElement } from "./HTMLHeadRowElement.js";

export class HTMLHeadColumnSizeSetterElement extends ColumnSizeSetterBase {

    constructor(headRow: HTMLHeadRowElement, previousCell: CellBase, nextCell: CellBase) {
        super(headRow, previousCell, nextCell);

        this.setElement();
    }

    private setElement(): void {
        this.createStyle();
        this.createElements();
        this.setEvents();
    }

    private createStyle(): void {
        this.style.height = "25px";
        this.style.cursor = "col-resize";

        const style = document.createElement("style");
        style.innerHTML =
            "div {" +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    width: 1px;" +
            "    left: 2px;" +
            "    top: 2px;" +
            "    height: 21px;" +
            "    background-color: #F0F0F0;" +
            "}";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        const div = document.createElement("div");
        this.shadowRoot.appendChild(div);
    }

    private setEvents(): void {
        const element = this;

        this.addEventListener("mousedown", function (this: HTMLHeadColumnSizeSetterElement, event: MouseEvent) {
            window.addEventListener("mousemove", mouseMoveEvent);
            window.addEventListener("mouseup", function (event: MouseEvent) {
                this.window.removeEventListener("mousemove", mouseMoveEvent);
            });
        });

        function mouseMoveEvent(event: MouseEvent) {
            const dx = event.movementX;
            element.sendLenght(dx);
        }
    }
}

window.customElements.define("head-column-size-setter", HTMLHeadColumnSizeSetterElement);



import { ColumnSizeSetterBase } from "./ColumnSizeSetterBase.js";
export class HTMLHeadColumnSizeSetterElement extends ColumnSizeSetterBase {
    constructor(headRow, previousCell, nextCell) {
        super(headRow, previousCell, nextCell);
        this.setElement();
    }
    setElement() {
        this.createStyle();
        this.createElements();
        this.setEvents();
    }
    createStyle() {
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
    createElements() {
        const div = document.createElement("div");
        this.shadowRoot.appendChild(div);
    }
    setEvents() {
        const element = this;
        this.addEventListener("mousedown", function (event) {
            window.addEventListener("mousemove", mouseMoveEvent);
            window.addEventListener("mouseup", function (event) {
                this.window.removeEventListener("mousemove", mouseMoveEvent);
            });
        });
        function mouseMoveEvent(event) {
            const dx = event.movementX;
            element.sendLenght(dx);
        }
    }
}
window.customElements.define("head-column-size-setter", HTMLHeadColumnSizeSetterElement);
//# sourceMappingURL=HTMLHeadColumnSizeSetterElement.js.map
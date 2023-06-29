import { CellBase } from "./CellBase.js";
export class HTMLContentCellElement extends CellBase {
    constructor(row, index, text) {
        super();
        this._row = row;
        this._index = index;
        this._text = text;
        this.setElement();
    }
    setElement() {
        this.createElements();
        this.createStyle();
        this.setEvent();
    }
    createStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "37px";
        this.style.userSelect = "none";
        this.style.width = this._row.getWidth(this._index);
        const style = document.createElement("style");
        style.innerHTML =
            "div {" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    overflow: hidden;" +
                "    width: 100%;" +
                "    height: 100%;" +
                "}" +
                "text {" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    overflow: hidden;" +
                "    top: 50%;" +
                "    transform: translateY(-50%);" +
                "    margin-left: 10px;" +
                "    height: 18px;" +
                "}";
        this.shadowRoot.appendChild(style);
    }
    createElements() {
        const text = document.createElement("text");
        text.innerText = this._text;
        const div = document.createElement("div");
        div.appendChild(text);
        this.shadowRoot.appendChild(div);
    }
    setEvent() {
        this.addEventListener("mouseover", function (event) {
            this._row.mouseOverEvent();
        });
        this.addEventListener("mouseleave", function (event) {
            this._row.mouseLeaveEvent();
        });
        this.addEventListener("mousedown", function (event) {
            const isCtrlPressed = event.ctrlKey;
            this._row.mouseDownEvent(isCtrlPressed);
        });
    }
    getIndex() {
        return this._index;
    }
    mouseOverEvent() {
        this.style.backgroundColor = "rgb(250, 250, 250)";
    }
    mouseLeaveEvent() {
        this.style.backgroundColor = "transparent";
    }
    mouseDownEvent(isSelected) {
        if (isSelected == true) {
            this.style.backgroundColor = "rgb(206, 227, 249)";
        }
        else {
            this.style.backgroundColor = "transparent";
        }
    }
}
window.customElements.define("content-cell", HTMLContentCellElement);
//# sourceMappingURL=HTMLContentCellElement.js.map
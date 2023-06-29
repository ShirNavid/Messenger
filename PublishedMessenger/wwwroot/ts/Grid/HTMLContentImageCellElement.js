import { CellBase } from "./CellBase.js";
export class HTMLContentImageCellElement extends CellBase {
    constructor(row, image) {
        super();
        this._row = row;
        this._image = image;
        this.setElement();
    }
    setElement() {
        this.createStyle();
        this.createElements();
        this.setEvent();
    }
    createStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "37px";
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
                "img {" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    overflow: hidden;" +
                "    top: 50%;" +
                "    transform: translateY(-50%);" +
                "    margin-left: 10px;" +
                "    user-select: none;" +
                "    height: 25px;" +
                "    width: 25px;" +
                "    border-radius: 50%;" +
                "    float: right;" +
                "    margin-right: 17px;" +
                "}";
        this.shadowRoot.appendChild(style);
    }
    createElements() {
        const img = document.createElement("img");
        img.src = "data:image/jpeg;base64," + this._image;
        const div = document.createElement("div");
        div.appendChild(img);
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
        return 0;
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
window.customElements.define("content-image-cell", HTMLContentImageCellElement);
//# sourceMappingURL=HTMLContentImageCellElement.js.map
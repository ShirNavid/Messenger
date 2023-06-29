import { CellBase } from "./CellBase.js";
export class HTMLContentHasBeenSeenCellElement extends CellBase {
    constructor(row, index, value) {
        super();
        this._row = row;
        this._index = index;
        this._value = value;
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
        this.style.userSelect = "none";
        this.style.width = this._row.getWidth(this._index);
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
        this.shadowRoot.appendChild(link);
        const style = document.createElement("style");
        style.innerHTML =
            "div {" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    overflow: hidden;" +
                "    width: 100%;" +
                "    height: 100%;" +
                "}" +
                "span.material-symbols-outlined {" +
                "    position: relative;" +
                "    display: inline-block !important;" +
                "    color: #b6b6b6;" +
                "    overflow: hidden;" +
                "    top: 50%;" +
                "    transform: translateY(-50%);" +
                "    margin-left: 10px;" +
                "    font-variation-settings:" +
                "    'FILL' 0," +
                "    'wght' 400," +
                "    'GRAD' 0," +
                "    'opsz' 24" +
                "}";
        this.shadowRoot.appendChild(style);
    }
    createElements() {
        const span = this.getSpan();
        const div = document.createElement("div");
        div.appendChild(span);
        this.shadowRoot.appendChild(div);
    }
    getSpan() {
        const span = document.createElement("span");
        span.classList.add("material-symbols-outlined");
        if (this._value) {
            span.innerHTML = "drafts";
        }
        else {
            span.innerHTML = "mail";
        }
        return span;
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
window.customElements.define("content-has-been-seen-cell", HTMLContentHasBeenSeenCellElement);
//# sourceMappingURL=HTMLContentHasBeenSeenCellElement.js.map
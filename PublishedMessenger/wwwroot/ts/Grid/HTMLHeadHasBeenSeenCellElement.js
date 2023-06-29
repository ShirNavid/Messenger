import { CellBase } from "./CellBase.js";
export class HTMLHeadHasBeenSeenCellElement extends CellBase {
    constructor(row, index) {
        super();
        this._row = row;
        this._index = index;
        this._order = null;
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
        this.style.height = "25px";
        this.style.width = "calc(100% - (60px) - (" + ((this._row.getColumnsCount() - 3)).toString() + " * 155px) - (60px))";
        const style = document.createElement("style");
        style.innerHTML =
            "div {" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    overflow: hidden;" +
                "    width: 100%;" +
                "    height: 100%;" +
                "}" +
                "text.text {" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    overflow: hidden;" +
                "    top: 50%;" +
                "    transform: translateY(-50%);" +
                "    margin-left: 10px;" +
                "    user-select: none;" +
                "}";
        this.shadowRoot.appendChild(style);
    }
    createElements() {
        const div = document.createElement("div");
        this.shadowRoot.appendChild(div);
        const text = document.createElement("text");
        div.appendChild(text);
        text.innerText = "HasBeenSeen";
        text.classList.add("text");
        const arrowText = document.createElement("text");
        div.appendChild(arrowText);
        arrowText.classList.add("arrow-text");
        arrowText.innerText = "";
    }
    setEvent() {
        this.addEventListener("mousedown", function (event) {
            const arrowText = this.shadowRoot.querySelector("text.arrow-text");
            if (this._order == null) {
                this._order = true;
                arrowText.innerHTML = "&#x25BE";
            }
            else if (this._order == true) {
                this._order = false;
                arrowText.innerHTML = "&#x25B4;";
            }
            else {
                this._order = null;
                arrowText.innerHTML = "";
            }
            this._row.setOrder();
        });
    }
    getIndex() {
        return this._index;
    }
    getOrder() {
        return this._order;
    }
}
window.customElements.define("head-has-been-seen-cell", HTMLHeadHasBeenSeenCellElement);
//# sourceMappingURL=HTMLHeadHasBeenSeenCellElement.js.map
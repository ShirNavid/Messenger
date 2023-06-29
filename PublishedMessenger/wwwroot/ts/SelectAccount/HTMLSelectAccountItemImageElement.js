export class HTMLSelectAccountItemImageElement extends HTMLElement {
    constructor(selectAccountItem, image) {
        super();
        this.attachShadow({ mode: 'open' });
        this._selectAccountItem = selectAccountItem;
        this.setElement(image);
    }
    setElement(image) {
        this.setStyle();
        this.createElements(image);
        this.setEvent();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.right = "0px";
        this.style.width = "49px";
        this.style.height = "100%";
        const style = document.createElement("style");
        style.innerHTML =
            "img {" +
                "    position: absolute;" +
                "    display: inline-flex;" +
                "    width: 25px;" +
                "    top: 2px;" +
                "    border-radius: 50%;" +
                "}";
        this.shadowRoot.appendChild(style);
    }
    createElements(image) {
        const img = document.createElement("img");
        img.src = "data:image/jpeg;base64," + image;
        this.shadowRoot.appendChild(img);
    }
    setEvent() {
        this.addEventListener("mouseover", function (event) {
            this._selectAccountItem.runMouseOverEvent();
        });
        this.addEventListener("mouseleave", function (event) {
            this._selectAccountItem.runMouseLeaveEvent();
        });
        this.addEventListener("mousedown", function (event) {
            this._selectAccountItem.setValue();
            this._selectAccountItem.close();
        });
    }
    runMouseOverEvent() {
        this.style.backgroundColor = "rgb(250, 250, 250)";
    }
    runMouseLeaveEvent() {
        this.style.backgroundColor = "white";
    }
}
window.customElements.define("select-account-item-image", HTMLSelectAccountItemImageElement);
//# sourceMappingURL=HTMLSelectAccountItemImageElement.js.map
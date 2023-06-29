export class HTMLSelectAccountSelectedItemImageElement extends HTMLElement {
    constructor(selectAccountSelectedItem, image) {
        super();
        this.attachShadow({ mode: 'open' });
        this._selectAccountSelectedItem = selectAccountSelectedItem;
        this.setElement(image);
    }
    setElement(image) {
        this.setStyle(image);
        this.createElements();
        this.setEvent();
    }
    setStyle(image) {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.right = "0px";
        this.style.width = "49px";
        this.style.height = "100%";
        const style = document.createElement("style");
        style.innerHTML =
            "img {" +
                "    position: relative;" +
                "    display: none;" +
                "    overflow: hidden;" +
                "    right: 0px;" +
                "    top: 2px;" +
                "    user-select: none;" +
                "    border-radius: 50%;" +
                "    width: 25px;" +
                "    height: calc(100% - 4px);" +
                "}" +
                "text {" +
                "    position: relative;" +
                "    display: inline-block;" +
                "    overflow: hidden;" +
                "    right: 0px;" +
                "    top: 6px;" +
                "    left: 10px;" +
                "    color: white;" +
                "    font-size: 11px;" +
                "    user-select: none;" +
                "}" +
                "";
        this.shadowRoot.appendChild(style);
    }
    createElements() {
        const img = document.createElement("img");
        this.shadowRoot.appendChild(img);
        const arrow = document.createElement("text");
        arrow.innerHTML = "&#x25BC;";
        this.shadowRoot.appendChild(arrow);
    }
    setEvent() {
        this.addEventListener("mousedown", function (event) {
            this._selectAccountSelectedItem.changeListStatus();
        });
    }
    setValue(image) {
        const img = this.shadowRoot.querySelector("img");
        img.src = "data:image/jpeg;base64," + image;
        const arrow = this.shadowRoot.querySelector("text");
        if (image == null || image == "") {
            img.style.display = "none";
            arrow.style.display = "inline-block";
        }
        else {
            img.style.display = "inline-block";
            arrow.style.display = "none";
        }
    }
}
window.customElements.define("select-account-selected-item-image", HTMLSelectAccountSelectedItemImageElement);
//# sourceMappingURL=HTMLSelectAccountSelectedItemImageElement.js.map
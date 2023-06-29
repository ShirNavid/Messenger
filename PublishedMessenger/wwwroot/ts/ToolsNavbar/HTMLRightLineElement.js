export class HTMLRightLineElement extends HTMLElement {
    constructor(dateAndTime) {
        super();
        this.attachShadow({ mode: 'open' });
        this._dateAndTime = dateAndTime;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "100%";
        this.style.width = "1px";
        this.style.top = "0px";
        this.style.right = "0px";
        this.style.backgroundColor = "#e5e5e5";
    }
    createElements() {
    }
}
window.customElements.define("right-line", HTMLRightLineElement);
//# sourceMappingURL=HTMLRightLineElement.js.map
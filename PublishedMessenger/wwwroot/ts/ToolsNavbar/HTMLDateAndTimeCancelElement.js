export class HTMLDateAndTimeCancelElement extends HTMLElement {
    constructor(dateAndTime) {
        super();
        this.attachShadow({ mode: 'open' });
        this._dateAndTime = dateAndTime;
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
        this.setEvent();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.padding = "4px 11px";
        this.style.fontSize = "14px";
        this.style.userSelect = "none";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "2px";
        this.style.borderRadius = "5px";
        this.style.backgroundColor = "white";
        this.style.color = "rgb(215, 50, 62)";
        this.style.borderColor = "rgb(215, 50, 62)";
        this.style.left = "10px";
    }
    createElements() {
        this.shadowRoot.innerHTML = "Cancel";
    }
    setEvent() {
        this.addEventListener("mouseover", function (event) {
            this.style.color = "rgb(185, 5, 18)";
            this.style.borderColor = "rgb(185, 5, 18)";
        });
        this.addEventListener("mouseleave", function (event) {
            this.style.color = "rgb(215, 50, 62)";
            this.style.borderColor = "rgb(215, 50, 62)";
        });
        this.addEventListener("mousedown", function (event) {
            this._dateAndTime.closeEvent();
        });
    }
}
window.customElements.define("date-and-time-cancel", HTMLDateAndTimeCancelElement);
//# sourceMappingURL=HTMLDateAndTimeCancelElement.js.map
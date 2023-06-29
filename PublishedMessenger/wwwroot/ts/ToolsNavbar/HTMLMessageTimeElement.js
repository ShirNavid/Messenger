export class HTMLMessageTimeElement extends HTMLElement {
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
        this.style.right = "156px";
        const style = document.createElement("style");
        style.innerHTML =
            "input[type='time'] {" +
                "    border-radius: 25px;" +
                "    outline: none;" +
                "    border: solid #e5e5e5 1px;" +
                "    font-family: system-ui;" +
                "    padding: 5px 0px 5px 38px;" +
                "}" +
                "input[type='time']::-webkit-calendar-picker-indicator {" +
                "    position: absolute;" +
                "    color: red;" +
                "    display: inline-block;" +
                "    left: 7px;" +
                "    top: 6px;" +
                "    opacity: 0.3;" +
                "}" +
                "";
        this.shadowRoot.appendChild(style);
    }
    createElements() {
        const input = document.createElement("input");
        input.type = "time";
        this.shadowRoot.appendChild(input);
    }
    getValue() {
        const input = this.shadowRoot.querySelector("input");
        const value = input.value;
        return value;
    }
    setNull() {
        const input = this.shadowRoot.querySelector("input");
        input.value = null;
    }
}
window.customElements.define("message-time", HTMLMessageTimeElement);
//# sourceMappingURL=HTMLMessageTimeElement.js.map
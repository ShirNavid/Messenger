import { HTMLDateAndTimeCancelElement } from "./HTMLDateAndTimeCancelElement.js";
import { HTMLDateAndTimeCoverElement } from "./HTMLDateAndTimeCoverElement.js";
import { HTMLLeftLineElement } from "./HTMLLeftLineElement.js";
import { HTMLMessageDateElement } from "./HTMLMessageDateElement.js";
import { HTMLMessageTimeElement } from "./HTMLMessageTimeElement.js";
import { HTMLRightLineElement } from "./HTMLRightLineElement.js";
export class HTMLDateAndTimeElement extends HTMLElement {
    constructor(toolsNavbar) {
        super();
        this.attachShadow({ mode: 'open' });
        this._toolsNavbar = toolsNavbar;
        this._rightLine = new HTMLRightLineElement(this);
        this._date = new HTMLMessageDateElement(this);
        this._time = new HTMLMessageTimeElement(this);
        this._cancel = new HTMLDateAndTimeCancelElement(this);
        this._cover = new HTMLDateAndTimeCoverElement(this);
        this._leftLine = new HTMLLeftLineElement(this);
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
        this.style.width = "343px";
        this.style.height = "32px";
        this.style.top = "4px";
        this.style.right = "733px";
        this.style.borderRadius = "5px";
        const style = document.createElement("style");
        style.innerHTML =
            "date-and-time-cover.closing {" +
                "    animation-name: cover-closing;" +
                "    animation-duration: 0.5s;" +
                "    animation-fill-mode: forwards;" +
                "}" +
                "date-and-time-cover.opening {" +
                "    animation-name: cover-opening;" +
                "    animation-duration: 0.5s;" +
                "    animation-fill-mode: forwards;" +
                "}" +
                "@keyframes cover-closing {" +
                "    from {" +
                "        left: -100%;" +
                "    }" +
                "    to {" +
                "        left: 0px;" +
                "    }" +
                "}" +
                "@keyframes cover-opening {" +
                "    from {" +
                "        left: 0px;" +
                "    }" +
                "    to {" +
                "        left: -100%;" +
                "    }" +
                "}" +
                "";
        this.shadowRoot.appendChild(style);
    }
    createElements() {
        this.shadowRoot.appendChild(this._rightLine);
        this.shadowRoot.appendChild(this._date);
        this.shadowRoot.appendChild(this._time);
        this.shadowRoot.appendChild(this._cancel);
        this.shadowRoot.appendChild(this._cover);
        this.shadowRoot.appendChild(this._leftLine);
    }
    getDate() {
        const date = this._date.getValue();
        return date;
    }
    getTime() {
        const time = this._time.getValue();
        return time;
    }
    closeEvent() {
        this._date.setNull();
        this._time.setNull();
        this._cover.close();
    }
}
window.customElements.define("date-and-time", HTMLDateAndTimeElement);
//# sourceMappingURL=HTMLDateAndTimeElement.js.map
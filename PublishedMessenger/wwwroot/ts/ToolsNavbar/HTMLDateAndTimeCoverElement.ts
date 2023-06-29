import { HTMLDateAndTimeElement } from "./HTMLDateAndTimeElement.js";

export class HTMLDateAndTimeCoverElement extends HTMLElement {

    private readonly _dateAndTime: HTMLDateAndTimeElement;

    constructor(dateAndTime: HTMLDateAndTimeElement) {
        super();

        this.attachShadow({ mode: "open" });

        this._dateAndTime = dateAndTime;

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }

    private setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.width = "calc(100% - 4px)";
        this.style.height = "calc(100% - 4px)";
        this.style.zIndex = "7";
        this.style.border = "solid 2px rgb(123, 0, 173)";
        this.style.color = "rgb(123, 0, 173)";
        this.style.borderRadius = "5px";
        this.style.backgroundColor = "white";

        const style = document.createElement("style");
        style.innerHTML =
            "text {" +
            "    position: absolute;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    left: 107px;" +
            "    top: 3px;" +
            "    font-size: 15px;" +
            "    user-select: none;" +
            "}" +
            "";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        const text = document.createElement("text");
        text.innerHTML = "Set date and time";
        this.shadowRoot.appendChild(text);
        this.classList.add("closed");
    }

    private setEvents(): void {
        this.addEventListener("mouseover", function (this: HTMLDateAndTimeCoverElement, event: MouseEvent) {
            this.style.border = "solid 2px rgb(92, 0, 129)";
            this.style.color = "rgb(92, 0, 129)";
        });

        this.addEventListener("mouseleave", function (this: HTMLDateAndTimeCoverElement, event: MouseEvent) {
            this.style.border = "solid 2px rgb(123, 0, 173)";
            this.style.color = "rgb(123, 0, 173)";
        });

        this.addEventListener("mousedown", function (this: HTMLDateAndTimeCoverElement, event: MouseEvent) {
            if (this.classList.contains("closed")) {
                this.classList.remove("closed");
            }
            if (this.classList.contains("closing")) {
                this.classList.remove("closing");
            }
            this.classList.add("opening");
        });
    }

    public close(): void {
        if (this.classList.contains("opening")) {
            this.classList.remove("opening");
        }
        this.classList.add("closing");
    }

}

window.customElements.define("date-and-time-cover", HTMLDateAndTimeCoverElement);
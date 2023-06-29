import { HTMLDateAndTimeElement } from "./HTMLDateAndTimeElement.js";

export class HTMLDateAndTimeCancelElement extends HTMLElement {

    private readonly _dateAndTime: HTMLDateAndTimeElement;

    constructor(dateAndTime: HTMLDateAndTimeElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._dateAndTime = dateAndTime;

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
        this.setEvent();
    }

    private setStyle(): void {
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

    private createElements(): void {
        this.shadowRoot.innerHTML = "Cancel";
    }

    private setEvent(): void {
        this.addEventListener("mouseover", function (this: HTMLDateAndTimeCancelElement, event: MouseEvent) {
            this.style.color = "rgb(185, 5, 18)";
            this.style.borderColor = "rgb(185, 5, 18)";
        });

        this.addEventListener("mouseleave", function (this: HTMLDateAndTimeCancelElement, event: MouseEvent) {
            this.style.color = "rgb(215, 50, 62)";
            this.style.borderColor = "rgb(215, 50, 62)";
        });

        this.addEventListener("mousedown", function (this: HTMLDateAndTimeCancelElement, event: MouseEvent) {
            this._dateAndTime.closeEvent();
        });
    }

}

window.customElements.define("date-and-time-cancel", HTMLDateAndTimeCancelElement);
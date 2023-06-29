import { HTMLDateAndTimeElement } from "./HTMLDateAndTimeElement.js";

export class HTMLLeftLineElement extends HTMLElement {

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
    }

    private setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "100%";
        this.style.width = "1px";
        this.style.top = "0px";
        this.style.left = "0px";
        this.style.backgroundColor = "#e5e5e5";
    }

    private createElements(): void {

    }

}

window.customElements.define("left-line", HTMLLeftLineElement);

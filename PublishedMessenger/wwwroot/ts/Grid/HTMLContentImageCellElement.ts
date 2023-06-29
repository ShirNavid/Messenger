import { CellBase } from "./CellBase.js";
import { HTMLContentRowElement } from "./HTMLContentRowElement.js";

export class HTMLContentImageCellElement extends CellBase {

    private readonly _row: HTMLContentRowElement;
    private readonly _image: string;

    constructor(row: HTMLContentRowElement, image: string) {
        super();

        this._row = row;
        this._image = image;

        this.setElement();
    }

    private setElement(): void {
        this.createStyle();
        this.createElements();
        this.setEvent();
    }

    private createStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.height = "37px";
        this.style.width = "60px";

        const style = document.createElement("style");
        style.innerHTML =
            "div {" +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    width: 100%;" +
            "    height: 100%;" +
            "}" +
            "img {" +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    top: 50%;" +
            "    transform: translateY(-50%);" +
            "    margin-left: 10px;" +
            "    user-select: none;" +
            "    height: 25px;" +
            "    width: 25px;" +
            "    border-radius: 50%;" +
            "    float: right;" + 
            "    margin-right: 17px;" + 
            "}";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        const img = document.createElement("img");
        img.src = "data:image/jpeg;base64," + this._image;
        const div = document.createElement("div");
        div.appendChild(img);
        this.shadowRoot.appendChild(div);
    }

    private setEvent(): void {
        this.addEventListener("mouseover", function (this: HTMLContentImageCellElement, event: MouseEvent) {
            this._row.mouseOverEvent();
        });
        this.addEventListener("mouseleave", function (this: HTMLContentImageCellElement, event: MouseEvent) {
            this._row.mouseLeaveEvent();
        });
        this.addEventListener("mousedown", function (this: HTMLContentImageCellElement, event: MouseEvent) {
            const isCtrlPressed = event.ctrlKey;
            this._row.mouseDownEvent(isCtrlPressed);
        });
    }

    public getIndex(): number {
        return 0;
    }

    public mouseOverEvent(): void {
        this.style.backgroundColor = "rgb(250, 250, 250)";
    }

    public mouseLeaveEvent(): void {
        this.style.backgroundColor = "transparent";
    }

    public mouseDownEvent(isSelected: boolean): void {
        if (isSelected == true) {
            this.style.backgroundColor = "rgb(206, 227, 249)";
        }
        else {
            this.style.backgroundColor = "transparent";
        }
    }

}

window.customElements.define("content-image-cell", HTMLContentImageCellElement);


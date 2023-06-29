import { PagingButtonsGroupBase } from "./PagingButtonsGroupBase.js";
import { PagingButtonData } from "./PagingButtonData.js";

export class HTMLPagingButtonsGroupElement extends PagingButtonsGroupBase {

    constructor() {
        super();

        this.setElement();
    }

    protected connectedCallback(): void {
        super.connectedCallback();
    }

    private setElement() {
        this.createStyle();
    }

    private createStyle() {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";

        const style = document.createElement("style");
        style.innerHTML =
            "div { " +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    font-size: 16px;" +
            "    user-select: none;" +
            "    height: 25px;" +
            "    width: 25px;" +
            "    border-left: solid rgb(240, 240, 240) 1px;" +
            "    border-top: solid rgb(240, 240, 240) 1px;" +
            "    border-bottom: solid rgb(240, 240, 240) 1px;" +
            "}" +
            "div[is-selected='true'] { " +
            "    background-color: #dedede;" +
            "}" +
            "div[is-working='true']:hover { " +
            "    background-color: rgb(250, 250, 250);" +
            "}" +
            "div:first-of-type { " +
            "    border-top-left-radius: 5px;" +
            "    border-bottom-left-radius: 5px;" +
            "    font-size: 15px;" +
            "}" +
            "div:last-of-type { " +
            "    font-size: 15px;" +
            "    border-top-right-radius: 5px;" +
            "    border-bottom-right-radius: 5px;" +
            "    border-right: solid rgb(240, 240, 240) 1px;" +
            "}" +
            "text { " +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    user-select: none;" +
            "    top: 50%;" +
            "    left: 50%;" +
            "    transform: translate(-50%, -50%);" +
            "}" +
            "";
        this.shadowRoot.appendChild(style);
    }

    protected setPagingButtons(): void {
        const buttons = this.shadowRoot.querySelectorAll("div");
        for (let i = 0; i < buttons.length; i++) {
            this.shadowRoot.firstChild.nextSibling.remove();
        }
        const pagingButtonDatas = this.getPagingButtonDatas();
        const pagingButtonsGroup = this;
        pagingButtonDatas.forEach(function (pagingButtonData: PagingButtonData) {
            const div = document.createElement("div");
            pagingButtonsGroup.shadowRoot.appendChild(div);
            div.setAttribute("is-not-banned", String(pagingButtonData.isNotBanned));
            div.setAttribute("is-working", String(pagingButtonData.isWorking));
            div.setAttribute("is-selected", String(pagingButtonData.isSelected));
            const text = document.createElement("text");
            text.innerHTML = pagingButtonData.text;
            div.appendChild(text);

            div.addEventListener("mousedown", function (event: MouseEvent) {
                const isNotBanned = div.getAttribute("is-not-banned");
                const isWorking = div.getAttribute("is-working");
                const isSelected = div.getAttribute("is-selected");
                if (isWorking == "true") {
                    const buttonText = div.querySelector("text").innerHTML;
                    if (buttonText == "◀") {
                        pagingButtonsGroup.selectPageNumber(pagingButtonsGroup._pageNumber - 1);
                    }
                    else if (buttonText == "▶") {
                        pagingButtonsGroup.selectPageNumber(pagingButtonsGroup._pageNumber + 1);
                    }
                    else {
                        const buttonNumber = parseInt(buttonText);
                        pagingButtonsGroup.selectPageNumber(buttonNumber);
                    }
                }
            });
        });
    }

    private getPagingButtonDatas(): PagingButtonData[] {
        const pagingButtonDatas = new Array<PagingButtonData>();

        const previousPagingButtonData = new PagingButtonData();
        previousPagingButtonData.isNotBanned = this._pageNumber <= 1;
        previousPagingButtonData.isWorking = this._pageNumber > 1;
        previousPagingButtonData.text = "&#9664;";
        previousPagingButtonData.isSelected = false;
        pagingButtonDatas.push(previousPagingButtonData);

        for (let i = 0; i < this._pagesCount; i++) {
            const number = i + 1;
            const numberString = number.toString();
            const mustBeExisted = Math.pow(number - this._pageNumber, 2) <= 1 || number == 1 || number == this._pagesCount;

            const isWorking = mustBeExisted && number != this._pageNumber;

            if (mustBeExisted) {

                const pagingButtonData = new PagingButtonData();
                pagingButtonData.isNotBanned = true;
                pagingButtonData.isWorking = isWorking;
                pagingButtonData.text = numberString;
                pagingButtonData.isSelected = this._pageNumber == number;

                pagingButtonDatas.push(pagingButtonData);
            }

        }

        for (let i = 2; i < pagingButtonDatas.length; i++) {
            const previousPagingButtonData = pagingButtonDatas[i - 1];
            const previousNumber = parseInt(previousPagingButtonData.text);
            const pagingButtonData = pagingButtonDatas[i];
            const thisNumber = parseInt(pagingButtonData.text);
            if (thisNumber - previousNumber != 1) {
                const pagingButtonData = new PagingButtonData();
                pagingButtonData.isNotBanned = true;
                pagingButtonData.isWorking = false;
                pagingButtonData.text = "...";
                pagingButtonData.isSelected = false;

                pagingButtonDatas.splice(i, 0, pagingButtonData);
                i += 1;
            }
        }

        const nextPagingButtonData = new PagingButtonData();
        nextPagingButtonData.isNotBanned = this._pageNumber != this._pagesCount;
        nextPagingButtonData.isWorking = this._pageNumber != this._pagesCount;
        nextPagingButtonData.text = "&#9654;";
        nextPagingButtonData.isSelected = false;
        pagingButtonDatas.push(nextPagingButtonData);

        return pagingButtonDatas;
    }

    private selectPageNumber(pageNumber: number): void {
        this._pageNumber = pageNumber;
        this.setPageNumber(pageNumber);
        this._grid.setGridContent();
        this.setPagingButtons();
    }

}

window.customElements.define("paging-buttons-group", HTMLPagingButtonsGroupElement);

import { createGuid } from "../GeneralClasses/JsToTs.js";
import { HTMLNavbarSearchElement } from "./HTMLNavbarSearchElement.js";

export class HTMLNavbarSearchInputElement extends HTMLElement {

    private readonly _navbarSearch: HTMLNavbarSearchElement
    private readonly _input: HTMLInputElement

    private _searchId: string
    private _searchFunctionName: string

    constructor(navbarSearch: HTMLNavbarSearchElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._navbarSearch = navbarSearch;
        this._input = document.createElement("input");

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }

    private setStyle(): void {
        this.style.position = "relative";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.top = "-2px";
        this.style.left = "0px";
        this.style.height = "32px";
        this.style.width = "306px";
        this.style.backgroundColor = "transparent";

        const style = document.createElement("style");
        style.innerHTML =
            "input {" +
            "    position: relative;" +
            "    display: inline-block;" +
            "    overflow: hidden;" +
            "    top: -1px;" +
            "    left: 0px;" +
            "    height: 32px;" +
            "    width: 306px; " +
            "    border: none;" +
            "    background-color: transparent;" +
            "    outline: none;" +
            "    color: #0C3B5E;" +
            "    font-size: 14px;" +
            "}" +
            "input::placeholder {" +
            "    color: #0C3B5E;" +
            "    font-size: 14px;" +
            "}" +
            "";
        this.shadowRoot.appendChild(style);
    }

    private createElements(): void {
        this.shadowRoot.appendChild(this._input);
        this._input.placeholder = "Search";
    }

    public setSearchFunction(searchFunctionName: string): void {
        this._searchFunctionName = searchFunctionName;
    }

    public setEvents(): void {
        const _this = this;
        this._input.addEventListener("input", function (event: MouseEvent) {
            const searchId = String(createGuid());
            _this._searchId = searchId;
            setTimeout(function () {
                if (searchId == _this._searchId) {
                    const value = _this._input.value.toString();
                    eval(_this._searchFunctionName + "('" + value + "');");
                }
            }, 1000);
        });
    }

}

window.customElements.define("navbar-search-input", HTMLNavbarSearchInputElement);


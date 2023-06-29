import { createGuid } from "../GeneralClasses/JsToTs.js";
export class HTMLNavbarSearchInputElement extends HTMLElement {
    constructor(navbarSearch) {
        super();
        this.attachShadow({ mode: 'open' });
        this._navbarSearch = navbarSearch;
        this._input = document.createElement("input");
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }
    setStyle() {
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
    createElements() {
        this.shadowRoot.appendChild(this._input);
        this._input.placeholder = "Search";
    }
    setSearchFunction(searchFunctionName) {
        this._searchFunctionName = searchFunctionName;
    }
    setEvents() {
        const _this = this;
        this._input.addEventListener("input", function (event) {
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
//# sourceMappingURL=HTMLNavbarSearchInputElement.js.map
export class HTMLToolsNavbarMenuItemElement extends HTMLElement {
    constructor(toolsNavbarList) {
        super();
        this.attachShadow({ mode: 'open' });
        this._toolsNavbarList = toolsNavbarList;
        this._isSelected = false;
        this.setBaseElement();
    }
    setBaseElement() {
        this.setBaseStyle();
        this.createBaseElements();
        this.setBaseEvents();
    }
    setBaseStyle() {
        this.style.position = "relative";
        this.style.display = "block";
        this.style.height = "41px";
        this.style.color = "white";
        this.style.backgroundColor = "transparent";
        this.style.fontFamily = "system-ui";
        const style = document.createElement("style");
        style.innerHTML =
            "div {" +
                "    position: absolute;" +
                "    display: inline-block; " +
                "    overflow: hidden; " +
                "    height: 100%; " +
                "    width: 100%; " +
                "    background-color: transparent; " +
                "}" +
                "div.getting-dark {" +
                "    background-color: transparent;" +
                "    animation-name: darken-div;" +
                "    animation-delay: 0.3s;" +
                "    animation-duration: 0.3s;" +
                "    animation-fill-mode: forwards;" +
                "}" +
                "@keyframes darken-div {" +
                "    from {" +
                "        background-color: transparent;" +
                "    }" +
                "    to {" +
                "        background-color: #2f2f2f;" +
                "    }" +
                "}" +
                "div.getting-light {" +
                "    animation-name: lighten-div;" +
                "    animation-duration: 0.3s;" +
                "    animation-fill-mode: forwards;" +
                "}" +
                "@keyframes lighten-div {" +
                "    from {" +
                "        background-color: #2f2f2f;" +
                "    }" +
                "    to {" +
                "        background-color: transparent;" +
                "    }" +
                "}" +
                "div.dark {" +
                "    background-color: #2f2f2f;" +
                "}" +
                "div.light {" +
                "    background-color: transparent;" +
                "}" +
                "text {" +
                "    position: absolute;" +
                "    display: inline-block; " +
                "    top: 10px;" +
                "    margin-left: 13px;" +
                "    text-align: center; " +
                "    cursor: default; " +
                "    color: transparent;" +
                "}" +
                "text.appearing {" +
                "    color: transparent;" +
                "    animation-name: appeare-text;" +
                "    animation-delay: 0.3s;" +
                "    animation-duration: 0.3s;" +
                "    animation-fill-mode: forwards;" +
                "}" +
                "@keyframes appeare-text {" +
                "    from {" +
                "        color: transparent;" +
                "    }" +
                "    to {" +
                "        color: white;" +
                "    }" +
                "}" +
                "text.disappearing {" +
                "    animation-name: disappeare-text;" +
                "    animation-duration: 0.3s;" +
                "    animation-fill-mode: forwards;" +
                "}" +
                "@keyframes disappeare-text {" +
                "    from {" +
                "        color: white;" +
                "    }" +
                "    to {" +
                "        color: transparent;" +
                "    }" +
                "}" +
                "";
        this.shadowRoot.appendChild(style);
    }
    createBaseElements() {
        const div = document.createElement("div");
        this.shadowRoot.appendChild(div);
        const text = document.createElement("text");
        div.appendChild(text);
    }
    setBaseEvents() {
        this.addEventListener("mouseover", function (event) {
            if (this._isSelected == false) {
                this.getDark();
            }
        });
        this.addEventListener("mouseleave", function (event) {
            if (this._isSelected == false) {
                this.getLight();
            }
        });
        this.addEventListener("mousedown", function (event) {
            const text = this.getText();
            const url = this.getUrl(text);
            globalThis.setPage(url);
        });
    }
    setText(text) {
        const textElement = this.shadowRoot.querySelector("text");
        textElement.innerHTML = text;
    }
    setStatus(value) {
        if (value == true) {
            this.appeareText();
            if (this._isSelected == true) {
                this.getDarkSlowly();
            }
        }
        else {
            this.disappeareText();
            if (this._isSelected == true) {
                this.getLightSlowly();
            }
        }
    }
    getText() {
        const text = this.shadowRoot.querySelector("text").innerHTML;
        return text;
    }
    setValue(isOpened, value) {
        this._isSelected = value;
        if (isOpened) {
            if (value == true) {
                this.getDark();
            }
            else {
                this.getLight();
            }
        }
    }
    getUrl(text) {
        while (text.includes(" ")) {
            const index = text.indexOf(" ");
            text = text.substring(0, index) + text[index + 1].toUpperCase() + text.substring(index + 2, text.length);
        }
        const url = text;
        return url;
    }
    getDark() {
        this.removeClasses();
        const div = this.shadowRoot.querySelector("div");
        div.classList.add("dark");
    }
    getDarkSlowly() {
        this.removeClasses();
        const div = this.shadowRoot.querySelector("div");
        div.classList.add("getting-dark");
    }
    getLight() {
        this.removeClasses();
        const div = this.shadowRoot.querySelector("div");
        div.classList.add("light");
    }
    getLightSlowly() {
        this.removeClasses();
        const div = this.shadowRoot.querySelector("div");
        div.classList.add("getting-light");
    }
    removeClasses() {
        const div = this.shadowRoot.querySelector("div");
        if (div.classList.contains("dark")) {
            div.classList.remove("dark");
        }
        if (div.classList.contains("getting-dark")) {
            div.classList.remove("getting-dark");
        }
        if (div.classList.contains("light")) {
            div.classList.remove("light");
        }
        if (div.classList.contains("getting-light")) {
            div.classList.remove("getting-light");
        }
    }
    appeareText() {
        const textElement = this.shadowRoot.querySelector("text");
        textElement.classList.add("appearing");
        if (textElement.classList.contains("disappearing")) {
            textElement.classList.remove("disappearing");
        }
    }
    disappeareText() {
        const textElement = this.shadowRoot.querySelector("text");
        textElement.classList.replace("appearing", "disappearing");
    }
}
//# sourceMappingURL=HTMLToolsNavbarMenuItemElement.js.map
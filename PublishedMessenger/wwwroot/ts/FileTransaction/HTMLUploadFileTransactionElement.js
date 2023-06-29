export class HTMLUploadFileTransactionElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._fileName = "";
        this._fileContent = "";
        this._fileType = "";
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }
    setStyle() {
        this.style.position = "absolute";
        this.style.top = "6px";
        this.style.width = "30px";
        this.style.maxWidth = "230px";
        this.style.height = "30px";
        this.style.borderRadius = "1000px";
        this.style.backgroundColor = "rgb(240, 240, 240)";
        this.style.right = "20px";
        this.style.overflow = "hidden";
        const style = document.createElement("style");
        style.innerHTML =
            "span.coverer {" +
                "    position: absolute;" +
                "    overflow: hidden;" +
                "    background-color: red;" +
                "    user-select: none;" +
                "    top: 0px;" +
                "    left: 0px;" +
                "    width: 100%;" +
                "    height: 100%;" +
                "    z-index: 50;" +
                "    opacity: 0;" +
                "}" +
                "span {" +
                "    position: absolute;" +
                "    overflow: hidden;" +
                "    font-weight: 250 !important;" +
                "    user-select: none;" +
                "    top: 3px;" +
                "    left: 3px;" +
                "    z-index: 40;" +
                "}" +
                "span.shown{" +
                "    display: inline-block;" +
                "}" +
                "span.hidden{" +
                "    display: none;" +
                "}" +
                "input {" +
                "    position: absolute;" +
                "    overflow: hidden;" +
                "    top: 6px;" +
                "    width: 100%;" +
                "    left: 3px;" +
                "    font-size: 15px;" +
                "    z-index: 40;" +
                "}" +
                "input[type='file']::file-selector-button {" +
                "    display: none;" +
                "    background-color: red;" +
                "}" +
                "input.shown{" +
                "    display: inline-block;" +
                "}" +
                "input.hidden{" +
                "    display: none;" +
                "}" +
                "";
        this.shadowRoot.appendChild(style);
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
        this.shadowRoot.appendChild(link);
    }
    createElements() {
        const covererSpan = document.createElement("span");
        this.shadowRoot.appendChild(covererSpan);
        covererSpan.classList.add("coverer");
        const span = document.createElement("span");
        span.innerHTML = "Attach_File";
        this.shadowRoot.appendChild(span);
        span.classList.add("material-symbols-outlined");
        span.classList.add("shown");
        const input = document.createElement("input");
        this.shadowRoot.appendChild(input);
        input.classList.add("hidden");
        input.setAttribute("type", "file");
    }
    setEvents() {
        const _this = this;
        const span = this.shadowRoot.querySelector("span:not(.coverer)");
        const input = this.shadowRoot.querySelector("input");
        input.addEventListener("change", function () {
            const reader = new FileReader();
            reader.onload = function () {
                let binary = '';
                const result = reader.result;
                const bytes = new Uint8Array(result);
                for (let i = 0; i < bytes.byteLength; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                if (input.value != "") {
                    _this._fileContent = window.btoa(binary);
                }
                else {
                    _this._fileContent = "";
                }
            };
            if (input.value != "") {
                reader.readAsArrayBuffer(input.files[0]);
                _this._fileName = input.files[0].name;
                _this._fileType = input.files[0].type;
            }
            else {
                _this._fileName = "";
                _this._fileType = "";
            }
        }, false);
        input.addEventListener("change", function () {
            if (input.value != "") {
                if (!input.classList.contains("shown")) {
                    input.classList.add("shown");
                }
                if (input.classList.contains("hidden")) {
                    input.classList.remove("hidden");
                }
                if (!span.classList.contains("hidden")) {
                    span.classList.add("hidden");
                }
                if (span.classList.contains("shown")) {
                    span.classList.remove("shown");
                }
                const width = _this.getWidth(_this._fileName);
                _this.style.width = width;
            }
            else {
                if (!input.classList.contains("hidden")) {
                    input.classList.add("hidden");
                }
                if (input.classList.contains("shown")) {
                    input.classList.remove("shown");
                }
                if (!span.classList.contains("shown")) {
                    span.classList.add("shown");
                }
                if (span.classList.contains("hidden")) {
                    span.classList.remove("hidden");
                }
                _this.style.width = "30px";
            }
        });
        this.addEventListener("mousedown", function (mouseEvent) {
            const input = this.shadowRoot.querySelector("input");
            input.click();
        });
        this.addEventListener("mouseover", function (mouseEvent) {
            this.style.backgroundColor = "rgb(213, 213, 213)";
        });
        this.addEventListener("mouseleave", function (mouseEvent) {
            this.style.backgroundColor = "rgb(240, 240, 240)";
        });
    }
    getWidth(text) {
        const div = document.createElement("div");
        document.body.appendChild(div);
        div.style.position = "fixed";
        div.style.display = "inline-block";
        div.style.overflow = "hidden";
        div.style.fontSize = "15px";
        div.style.bottom = "-70px";
        div.style.right = "-70px";
        div.style.fontFamily = "system-ui";
        div.innerText = text;
        const width = "calc(" + getComputedStyle(div).width + " + 10px)";
        div.remove();
        return width;
    }
    getFileName() {
        return this._fileName;
    }
    getFileContent() {
        return this._fileContent;
    }
    getFileType() {
        return this._fileType;
    }
}
window.customElements.define("upload-file-transaction", HTMLUploadFileTransactionElement);
//# sourceMappingURL=HTMLUploadFileTransactionElement.js.map
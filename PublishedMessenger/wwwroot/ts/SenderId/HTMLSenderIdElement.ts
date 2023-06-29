export class HTMLSenderIdElement extends HTMLElement {

    constructor() {
        super();

        this.setStyle();
    }

    private setStyle(): void {
        this.style.display = "none";
    }

}

window.customElements.define("sender-id", HTMLSenderIdElement);
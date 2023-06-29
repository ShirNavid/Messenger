export class HTMLMainReceiverIdElement extends HTMLElement {

    constructor() {
        super();

        this.setStyle();
    }

    private setStyle(): void {
        this.style.display = "none";
    }

}

window.customElements.define("main-receiver-id", HTMLMainReceiverIdElement);

export class HTMLReplyIdElement extends HTMLElement {

    constructor() {
        super();

        this.setStyle();
    }

    private setStyle(): void {
        this.style.display = "none";
    }

}

window.customElements.define("reply-id", HTMLReplyIdElement);

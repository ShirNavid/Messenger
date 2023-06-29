import { HTMLToolsNavbarMenuItemElement } from "./HTMLToolsNavbarMenuItemElement.js";
import { HTMLToolsNavbarMenuListElement } from "./HTMLToolsNavbarMenuListElement.js";

export class HTMLNewMessageItemElement extends HTMLToolsNavbarMenuItemElement {

    constructor(toolsNavbarMenuList: HTMLToolsNavbarMenuListElement) {
        super(toolsNavbarMenuList);

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }

    private setStyle(): void {

    }

    private createElements(): void {
        this.setText("New message");
    }

    private setEvents(): void {

    }

}

window.customElements.define("new-message", HTMLNewMessageItemElement);

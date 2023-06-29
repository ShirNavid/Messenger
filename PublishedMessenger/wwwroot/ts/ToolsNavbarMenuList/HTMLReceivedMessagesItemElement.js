import { HTMLToolsNavbarMenuItemElement } from "./HTMLToolsNavbarMenuItemElement.js";
export class HTMLReceivedMessagesItemElement extends HTMLToolsNavbarMenuItemElement {
    constructor(toolsNavbarMenuList) {
        super(toolsNavbarMenuList);
        this.setElement();
    }
    setElement() {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }
    setStyle() {
    }
    createElements() {
        this.setText("Received messages");
    }
    setEvents() {
    }
}
window.customElements.define("received-messages", HTMLReceivedMessagesItemElement);
//# sourceMappingURL=HTMLReceivedMessagesItemElement.js.map
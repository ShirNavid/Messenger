import { HTMLToolsNavbarMenuItemElement } from "./HTMLToolsNavbarMenuItemElement.js";
export class HTMLSendedMessagesItemElement extends HTMLToolsNavbarMenuItemElement {
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
        this.setText("Sended messages");
    }
    setEvents() {
    }
}
window.customElements.define("sended-messages", HTMLSendedMessagesItemElement);
//# sourceMappingURL=HTMLSendedMessagesItemElement.js.map
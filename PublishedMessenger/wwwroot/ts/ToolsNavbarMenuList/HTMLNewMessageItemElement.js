import { HTMLToolsNavbarMenuItemElement } from "./HTMLToolsNavbarMenuItemElement.js";
export class HTMLNewMessageItemElement extends HTMLToolsNavbarMenuItemElement {
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
        this.setText("New message");
    }
    setEvents() {
    }
}
window.customElements.define("new-message", HTMLNewMessageItemElement);
//# sourceMappingURL=HTMLNewMessageItemElement.js.map
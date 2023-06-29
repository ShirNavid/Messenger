import { MessageDisplayerManager } from "./MessageDisplayerManager.js";
export class MessageDisplayerBase extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this._messagerDisplayerId = this.getAttribute("message-displayer-id");
    }
    getMessagesData() {
        const messagesData = MessageDisplayerManager.getMessagesData(this._messagerDisplayerId);
        return messagesData;
    }
}
//# sourceMappingURL=MessageDisplayerBase.js.map
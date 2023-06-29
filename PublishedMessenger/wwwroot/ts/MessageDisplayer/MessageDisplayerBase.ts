import { MessageData } from "./MessageData.js";
import { MessageDisplayerManager } from "./MessageDisplayerManager.js";

export abstract class MessageDisplayerBase extends HTMLElement {

    protected _messagerDisplayerId: string;

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    protected connectedCallback(): void {
        this._messagerDisplayerId = this.getAttribute("message-displayer-id");
    }

    protected getMessagesData(): MessageData[] {
        const messagesData = MessageDisplayerManager.getMessagesData(this._messagerDisplayerId);
        return messagesData;
    }

}

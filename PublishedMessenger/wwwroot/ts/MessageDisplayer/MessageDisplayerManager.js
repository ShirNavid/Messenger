import { getData } from "../GeneralClasses/JsToTs.js";
export class MessageDisplayerManager {
    static getMessagesData(messageDisplayerId) {
        const parameters = { "messageDisplayerId": messageDisplayerId };
        const messagesData = getData("GetMessagesData", parameters);
        return messagesData;
    }
}
//# sourceMappingURL=MessageDisplayerManager.js.map
import { getData } from "../GeneralClasses/JsToTs.js";
import { MessageData } from "./MessageData.js";

export class MessageDisplayerManager {

    public static getMessagesData(messageDisplayerId: string): MessageData[] {
        const parameters = { "messageDisplayerId": messageDisplayerId };
        const messagesData = getData("GetMessagesData", parameters) as MessageData[];
        return messagesData;
    }

}

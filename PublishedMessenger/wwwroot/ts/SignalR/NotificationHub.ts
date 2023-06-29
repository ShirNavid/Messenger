import { HTMLNotificationElement } from "../Notification/HTMLNotificationElement.js";
import { NotificationData } from "../Notification/NotificationData.js";

export function notif(notificationsString: string) {
    const notificationsData = getObjectifiedParameter<Array<NotificationData>>(notificationsString);
    notificationsData.forEach(function (data) {
        const notif = new HTMLNotificationElement(data);
        document.body.appendChild(notif);
    });
}

function getObjectifiedParameter<T>(stringifiedParameter) {
    const parameter = JSON.parse(stringifiedParameter) as T;
    return parameter;
}


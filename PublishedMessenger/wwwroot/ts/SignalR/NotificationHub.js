import { HTMLNotificationElement } from "../Notification/HTMLNotificationElement.js";
export function notif(notificationsString) {
    const notificationsData = getObjectifiedParameter(notificationsString);
    notificationsData.forEach(function (data) {
        const notif = new HTMLNotificationElement(data);
        document.body.appendChild(notif);
    });
}
function getObjectifiedParameter(stringifiedParameter) {
    const parameter = JSON.parse(stringifiedParameter);
    return parameter;
}
//# sourceMappingURL=NotificationHub.js.map
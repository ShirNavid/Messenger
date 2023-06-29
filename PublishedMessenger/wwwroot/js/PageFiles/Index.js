import { getData } from "../../ts/GeneralClasses/JsToTs.js"
import { HTMLNotificationElement } from "../../ts/Notification/HTMLNotificationElement.js"
import { extendedRemoveEventListener } from "../GeneralFiles/ExtendedEventListenersFunctions.js"

const iframe = document.body.querySelector("iframe");
const toolsNavbarMenuList = document.body.querySelector("tools-navbar-menu-list");

globalThis.setPage = function (url) {
    const events = iframe.events;
    if (events != undefined) {
        events.forEach(function (event) {
            if (event.eventName == "load") {
                const eventFunction = event.eventFunction;
                extendedRemoveEventListener(iframe, "load", eventFunction);
            }
        });
    }
    iframe.src = "/" + url;
    globalThis.pageFunctions[url]();
};

globalThis.setPageWithParameters = function (url, parameters) {
    const events = iframe.events;
    if (events != undefined) {
        events.forEach(function (event) {
            if (event.eventName == "load") {
                const eventFunction = event.eventFunction;
                extendedRemoveEventListener(iframe, "load", eventFunction);
            }
        });
    }
    iframe.src = "/" + url + "?" + JSON.stringify(parameters);
    globalThis.pageFunctions[url]();
};

(function setNotifs() {
    const notificationsData = getData("GetNotifications", {});
    notificationsData.forEach(function (notificationData) {
        const notification = new HTMLNotificationElement(notificationData);
        document.body.appendChild(notification);
    });
})();

(function initializePage() {
    globalThis.setPage("ReceivedMessages")
})();


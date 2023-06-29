import { notif } from "../../ts/SignalR/NotificationHub.js"

var connection = new signalR.HubConnectionBuilder().withUrl("/NotificationHub").build();

connection.on("notif", function (notificationsString) {
    notif(notificationsString);
});

connection.start();


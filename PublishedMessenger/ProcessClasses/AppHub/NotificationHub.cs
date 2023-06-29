using DatabaseLibrary;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using NotificationManagerLibrary.Interfaces;
using NotificationManagerLibrary.MainClasses;
using System.Security.Claims;

namespace Massenger.ProcessClasses.AppHub;

public class NotificationHub : Hub
{
    private readonly static List<int> _users;
    static NotificationHub()
    {
        _users = new List<int>();
    }

    private readonly INotificationManager _notificationManager;
    public NotificationHub(INotificationManager notificationManager)
    {
        _notificationManager = notificationManager;
    }

    public static bool IsUserOnline(int userId) {
        var isOnline = _users.Any(c => c == userId);
        return isOnline;
    }
    
    public override async Task OnConnectedAsync()
    {
        await Task.Run(() =>
        {
            var id = Convert.ToInt16(Context.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value);
            _users.Add(id);

            while (true)
            {
                var hasAnyMessage = _notificationManager.HasAnyMessage(id);
                if (hasAnyMessage)
                {
                    var notifications = _notificationManager.GetNotificationsData(id);
                    var notificationsString = JsonConvert.SerializeObject(notifications);
                    Clients.Caller.SendAsync("notif", notificationsString);
                }
                var now = GetNow();
                _notificationManager.SetNextNotifications(now);

                var milliSeconds = (60 - DateTime.Now.Second) * 1000;
                Task.Delay(milliSeconds).Wait();
            }
        });
    }
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await Task.Run(() =>
        {
            var id = Convert.ToInt16(Context.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value);
            _users.Remove(id);
        });
    }

    private DateTime GetNow()
    {
        var dateTime = DateTime.Now;
        var now = new DateTime(dateTime.Year, dateTime.Month, dateTime.Day, dateTime.Hour, dateTime.Minute, 0);
        return now;
    }
}


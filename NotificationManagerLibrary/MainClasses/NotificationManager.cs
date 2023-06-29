using DatabaseLibrary;
using ModelsLibrary.Models;
using ModelsLibrary.NotificationModels;
using NotificationManagerLibrary.Interfaces;
using NotificationManagerLibrary.MainClasses;

namespace NotificationManagerLibrary.MainClasses;

public class NotificationManager : INotificationManager
{
    private MyDatabaseContext _db;
    private List<NotificationData> _notificationsData;
    private DateTime _nowTime;

    public NotificationManager(MyDatabaseContext db)
    {
        _db = db;
        _nowTime = GetNowTime();
        _notificationsData = GetNotificationsData();
    }

    public bool HasAnyMessage(int id)
    {
        var any = _notificationsData.Any(c => c.ReceiverId == id);
        return any;
    }
    public List<NotificationData> GetNotificationsData(int id)
    {
        var notificationsData = _notificationsData.FindAll(c => c.ReceiverId == id);
        _notificationsData.RemoveAll(c => c.ReceiverId == id);
        return notificationsData;
    }
    public void SetNextNotifications(DateTime now)
    {
        if (_nowTime != now)
        {
            _nowTime = now;
            _notificationsData.ForEach
                (c => _db.Set<Notification>().Add(new Notification { ReceiverId = c.ReceiverId, SenderId = c.SenderId }));
            _db.SaveChanges();
            _notificationsData = GetNotificationsData();
        }
    }

    private List<NotificationData> GetNotificationsData()
    {
        var notificationsData =
            _db.Set<MessageLink>().Where(c => _nowTime == c.Time).Select(c => new NotificationData
            {
                ReceiverId = c.ReceiverId,
                SenderId = c.SenderId,
                SenderName = c.Sender.Name,
            }).ToList();
        return notificationsData;
    }
    private DateTime GetNowTime()
    {
        var now = DateTime.Now;
        var time = new DateTime(now.Year, now.Month, now.Day, now.Hour, now.Minute, 0);
        return time;
    }
}

using ModelsLibrary.NotificationModels;
using NotificationManagerLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotificationManagerLibrary.Interfaces;

public interface INotificationManager
{
    bool HasAnyMessage(int id);
    List<NotificationData> GetNotificationsData(int id);
    void SetNextNotifications(DateTime now);
}

using DatabaseLibrary;
using DataComponentLibrary.Interfaces;
using Massenger.ProcessClasses.AppHub;
using Massenger.ProcessClasses.AppPage;
using MessageDisplayerLibrary.Interfaces;
using MessageDisplayerLibrary.MainClasses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.SignalR;
using ModelsLibrary.Models;
using ModelsLibrary.NotificationModels;
using ModelsLibrary.ShownModels;
using Newtonsoft.Json;
using SelectAccountLibrary.Interfaces;
using SelectAccountLibrary.MainClasses;
using System.Security.Claims;

namespace Massenger.Pages.NewMessage;

[Authorize(Roles = "Admin,User")]
public class NewMessageModel : AppPageModel
{
    private readonly MyDatabaseContext _db;
    private readonly IHubContext<NotificationHub> _hub;

    public int SenderId { get; set; }
    public ISelectAccount SelectAccount { get; set; }
    
    public NewMessageModel(MyDatabaseContext db, ISelectAccount selectAccount, IHubContext<NotificationHub> hub)
    {
        _db = db;
        _hub = hub;
        SelectAccount = selectAccount;
    }

    public override IActionResult ExtendedOnGet()
    {
        SenderId = GetSenderId();
        var selectAccounts = _db.Set<ModelsLibrary.Models.Account>().ToList().ConvertAll(c => new AccountData
        {
            Id = c.Id,
            Text = c.Name,
            Image = Convert.ToBase64String(c.Picture)
        });
        SelectAccount.SetAccountsData(selectAccounts);

        return Page();
    }

    public void SendNewMessage(string title, string text, string date, string time, string fileName, string fileContent, string fileType, int mainAccountId, int[] secondaryAccountIds)
    {
        SendMessages(title, text, date, time, fileName, fileContent, fileType, mainAccountId, secondaryAccountIds);
        SetNotifs(time, mainAccountId, secondaryAccountIds);
    }

    private void SendMessages(string title, string text, string date, string time, string fileName, string fileContent, string fileType, int mainAccountId, int[] secondaryAccountIds)
    {
        var senderId = GetSenderId();
        var messageContent = new MessageContent()
        {
            BaseMessageContentId = null,
            Title = title,
            Text = text,
            HasBeenSeen = false,
        };
        _db.Set<MessageContent>().Add(messageContent);

        var messageLinks = new List<MessageLink>();
        var sendTime = DateTime.Now;
        var receiveTime = GetDateTime(date, time);

        var mainMessageLink1 = new MessageLink
        {
            HasBeenPinned = false,
            MessageContent = messageContent,
            OwnerId = senderId,
            SenderId = senderId,
            ReceiverId = mainAccountId,
            Time = sendTime,
        };
        var mainMessageLink2 = new MessageLink
        {
            HasBeenPinned = false,
            MessageContent = messageContent,
            OwnerId = mainAccountId,
            SenderId = senderId,
            ReceiverId = mainAccountId,
            Time = receiveTime,
        };
        _db.Set<MessageLink>().Add(mainMessageLink1);
        _db.Set<MessageLink>().Add(mainMessageLink2);


        foreach (var account in secondaryAccountIds)
        {
            var messageLink1 = new MessageLink
            {
                HasBeenPinned = false,
                MessageContent = messageContent,
                OwnerId = senderId,
                SenderId = senderId,
                ReceiverId = account,
                Time = sendTime,
            };
            var messageLink2 = new MessageLink
            {
                HasBeenPinned = false,
                MessageContent = messageContent,
                OwnerId = account,
                SenderId = senderId,
                ReceiverId = account,
                Time = receiveTime,
            };
            _db.Set<MessageLink>().Add(messageLink1);
            _db.Set<MessageLink>().Add(messageLink2);
        }

        if (fileName != String.Empty)
        {
            var fileData = new FileData
            {
                Name = fileName,
                Content = Convert.FromBase64String(fileContent),
                Type = fileType,
                MessageContent = messageContent,
            };
            _db.Set<FileData>().Add(fileData);
        }
        _db.SaveChanges();
    }
    private void SetNotifs(string time, int mainAccountId, int[] secondaryAccountIds)
    {
        var senderId = GetSenderId();
        if (time == String.Empty)
        {
            var allIds = secondaryAccountIds.ToList();
            allIds.Insert(0, mainAccountId);

            foreach (var id in allIds)
            {
                var isClientInSystem = NotificationHub.IsUserOnline(id);
                var senderName = _db.Set<ModelsLibrary.Models.Account>().FirstOrDefault(c => c.Id == senderId).Name;
                if (isClientInSystem)
                {
                    var client = _hub.Clients.User(id.ToString());
                    var notificationsData = new List<NotificationData> { new NotificationData
                    {
                        SenderId = senderId,
                        ReceiverId = id,
                        SenderName = senderName,
                    } };
                    var notificationDataString = JsonConvert.SerializeObject(notificationsData);
                    client.SendAsync("notif", notificationDataString);
                }
                else
                {
                    var notification = new Notification
                    {
                        SenderId = senderId,
                        ReceiverId = id,
                    };
                    _db.Set<Notification>().Add(notification);
                }
            }
        }
        _db.SaveChanges();
    }
    private DateTime GetDateTime(string date, string time)
    {
        DateTime dateTime;
        if (date != string.Empty && time != String.Empty)
        {
            var year = GetYear(date);
            var month = GetMonth(date);
            var day = GetDay(date);
            var hour = GetHour(time);
            var minute = GetMinute(time);

            dateTime = new(year, month, day, hour, minute, 0);
        }
        else
        {
            dateTime = DateTime.Now;
        }

        return dateTime;
    }
    private int GetYear(string date)
    {
        var year = Convert.ToInt16(date.Substring(0, 4));
        return year;
    }
    private int GetMonth(string date)
    {
        var month = Convert.ToInt16(date.Substring(5, 2));
        return month;
    }
    private int GetDay(string date)
    {
        var month = Convert.ToInt16(date.Substring(8, 2));
        return month;
    }
    private int GetHour(string time)
    {
        var hour = Convert.ToInt16(time.Substring(0, 2));
        return hour;
    }
    private int GetMinute(string time)
    {
        var minute = Convert.ToInt16(time.Substring(3, 2));
        return minute;
    }

    private int GetSenderId()
    {
        var accountId = Convert.ToInt16(User.Claims.ToList().Find(c => c.Type == ClaimTypes.NameIdentifier).Value);
        return accountId;
    }
}

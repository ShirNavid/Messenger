using DatabaseLibrary;
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
using Newtonsoft.Json;
using SelectAccountLibrary.Interfaces;
using SelectAccountLibrary.MainClasses;
using System.Security.Claims;

namespace Massenger.Pages.Reply;

[Authorize(Roles = "Admin,User")]
public class ReplyModel : AppPageModel
{
    private readonly MyDatabaseContext _db;
    private readonly IHubContext<NotificationHub> _hub;

    public int ReplyId { get; set; }
    public int SenderId { get; set; }
    public int MainReceiverId { get; set; }
    public ISelectAccount SelectAccount { get; set; }
    public IMessageDisplayer MessageDisplayer { get; set; }

    public ReplyModel(MyDatabaseContext db, IHubContext<NotificationHub> hub, ISelectAccount selectAccount, IMessageDisplayer messageDisplayer)
    {
        _db = db;
        _hub = hub;
        SelectAccount = selectAccount;
        MessageDisplayer = messageDisplayer;
    }

    public override IActionResult ExtendedOnGet()
    {
        ReplyId = Convert.ToInt16(urlParameters["replyId"]);
        MainReceiverId = _db.MessageLinks.First(c => c.Id == ReplyId).SenderId;
        SenderId = GetSenderId();
        var selectAccounts = _db.Set<ModelsLibrary.Models.Account>().ToList().ConvertAll(c => new AccountData
        {
            Id = c.Id,
            Text = c.Name,
            Image = Convert.ToBase64String(c.Picture)
        });
        SelectAccount.SetAccountsData(selectAccounts);
        MessageDisplayer.MessagesData = GetMessagesData();

        return Page();
    }

    public void SendNewMessages(int replyId, string title, string text, string date, string time, string fileName, string fileContent, string fileType, int mainAccountId, int[] secondaryAccountIds)
    {
        SendMessages(replyId, title, text, date, time, fileName, fileContent, fileType, mainAccountId, secondaryAccountIds);
        SetNotifs(time, mainAccountId, secondaryAccountIds);
    }

    private List<MessageData> GetMessagesData()
    {
        var messagePairs = GetMessagePairs();
        var messagesData = messagePairs.ConvertAll(c => new MessageData
        {
            DateTime = c.MessageLink.Time.ToString("yyyy/MM/dd HH:mm"),
            IsSenderMe = c.MessageLink.SenderId == SenderId,
            Title = c.MessageContent.Title,
            Text = c.MessageContent.Text,
            FileId = (c.FileData == null) ? 0 : c.FileData.Id,
            FileName = (c.FileData == null) ? String.Empty : c.FileData.Name,
        }) ;
        return messagesData;
    }
    private List<MessageDataBox> GetMessagePairs()
    {
        var message = GetFirstMessage();
        var messages = new List<MessageDataBox>() { message };
        var previousMessage = GetPreviousMessage(message);
        while (previousMessage != null)
        {
            messages.Insert(0, previousMessage);
            previousMessage = GetPreviousMessage(previousMessage);
        }
        return messages;
    }
    private MessageDataBox GetFirstMessage()
    {
        var messageLink = _db.Set<MessageLink>()
            .FirstOrDefault(c => c.Id == ReplyId && c.OwnerId == SenderId);
        var messageContent = _db.Set<MessageContent>().FirstOrDefault(c => c.Id == messageLink.MessageContentId);
        var fileData = _db.Set<FileData>().FirstOrDefault(c => c.MessageContentId == messageContent.Id);
        var messagePair = new MessageDataBox { MessageContent = messageContent, MessageLink = messageLink, FileData = fileData };
        return messagePair;
    }
    private MessageDataBox GetPreviousMessage(MessageDataBox message)
    {
        MessageDataBox previousMessage = null;
        if (message.MessageContent.BaseMessageContentId != null)
        {
            var messageContent = _db.Set<MessageContent>().FirstOrDefault(c => c.Id == message.MessageContent.BaseMessageContentId);
            var messageLink = _db.Set<MessageLink>().FirstOrDefault(c => c.MessageContentId == messageContent.Id && c.OwnerId == SenderId);
            var fileData = _db.Set<FileData>().FirstOrDefault(c => c.MessageContentId == messageContent.Id);
            previousMessage = new MessageDataBox { MessageContent = messageContent, MessageLink = messageLink, FileData = fileData };
        }

        return previousMessage;
    }

    private class MessageDataBox
    {
        public MessageContent MessageContent { get; set; }
        public MessageLink MessageLink { get; set; }
        public FileData FileData { get; set; }
    }

    private void SendMessages(int replyId, string title, string text, string date, string time, string fileName, string fileContent, string fileType, int mainAccountId, int[] secondaryAccountIds)
    {
        var senderId = GetSenderId();
        var messageContent = new MessageContent()
        {
            BaseMessageContentId = replyId,
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

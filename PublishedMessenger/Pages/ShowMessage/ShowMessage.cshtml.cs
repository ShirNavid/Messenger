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
using System.Security.Claims;

namespace Massenger.Pages.ShowMessage;

[Authorize(Roles = "Admin,User")]
public class ShowMessageModel : AppPageModel
{
    private readonly MyDatabaseContext _db;

    public int MessageId { get; set; }
    public int AccountId { get; set; }
    public IMessageDisplayer MessageDisplayer { get; set; }

    public ShowMessageModel(MyDatabaseContext db, IMessageDisplayer messageDisplayer)
    {
        _db = db;
        MessageDisplayer = messageDisplayer;

    }

    public override IActionResult ExtendedOnGet()
    {
        MessageId = Convert.ToInt16(urlParameters["messageId"]);
        AccountId = GetAccountId();
        var messageBoxes = GetMessageBoxes();
        SetMessagesSeen(messageBoxes);
        MessageDisplayer.MessagesData = GetMessagesData(messageBoxes);

        return Page();
    }

    private List<MessageData> GetMessagesData(List<MessageDataBox> messageBoxes)
    {
        var messagesData = messageBoxes.ConvertAll(c =>
            new MessageData
            {
                DateTime = c.MessageLink.Time.ToString("yyyy/MM/dd HH:mm"),
                IsSenderMe = c.MessageLink.SenderId == AccountId,
                Title = c.MessageContent.Title,
                Text = c.MessageContent.Text,
                FileId = (c.FileData == null) ? 0 : c.FileData.Id,
                FileName = (c.FileData == null) ? String.Empty : c.FileData.Name,
            });

        return messagesData;
    }
    private void SetMessagesSeen(List<MessageDataBox> messageBoxes)
    {
        foreach (var messageBox in messageBoxes)
        {
            messageBox.MessageContent.HasBeenSeen = true;
            _db.Set<MessageContent>().Update(messageBox.MessageContent);
        }
        _db.SaveChanges();
    }
    private List<MessageDataBox> GetMessageBoxes()
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
        var messageLink = _db.Set<MessageLink>().FirstOrDefault(c => c.Id == MessageId && c.OwnerId == AccountId);
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
            var messageLink = _db.Set<MessageLink>().FirstOrDefault(c => c.MessageContentId == messageContent.Id && c.OwnerId == AccountId);
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

    private int GetAccountId()
    {
        var accountId = Convert.ToInt16(User.Claims.ToList().Find(c => c.Type == ClaimTypes.NameIdentifier).Value);
        return accountId;
    }
}

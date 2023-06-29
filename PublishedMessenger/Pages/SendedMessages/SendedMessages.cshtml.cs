using DatabaseLibrary;
using GridLibrary.Interfaces;
using Massenger.ProcessClasses.AppPage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ModelsLibrary.Models;
using ModelsLibrary.ShownModels;
using System.Security.Claims;

namespace Massenger.Pages.SendedMessages;

[Authorize(Roles = "Admin,User")]
public class SendedMessagesModel : AppPageModel
{
    private readonly MyDatabaseContext _db;

    public int SenderId { get; set; }
    public IGrid<ShownSendedMessage> Grid { get; set; }

    public SendedMessagesModel(MyDatabaseContext db, IGrid<ShownSendedMessage> grid, IHttpContextAccessor httpContextAccessor)
    {
        _db = db;
        SenderId = Convert.ToInt16(httpContextAccessor.HttpContext.User.Claims.ToList().Find(c => c.Type == ClaimTypes.NameIdentifier).Value);

        Grid = grid;
        var data = GetShownSendedMessages();

        Grid.SetData(data);
        Grid.SetPagingProps(20);
        Grid.AddConvertor(c =>
        {
            c.Sended = ConvertDateTime(c.Sended);
            return c;
        });
    }

    public override IActionResult ExtendedOnGet()
    {
        return Page();
    }

    public bool IsPossibleToDelete(int[] ids)
    {
        var isPossible = true;
        foreach (var id in ids)
        {
            var messageContents = _db.Set<MessageContent>();

            if (messageContents.Any(c => c.BaseMessageContentId == id))
            {
                isPossible = false;
            }
        }
        return isPossible;
    }
    public void DeleteMessages(int[] ids)
    {
        var accountId = SenderId;
        foreach (var id in ids)
        {
            var messageLinks = _db.Set<MessageLink>();
            var messageLink = messageLinks.FirstOrDefault(c => c.Id == id && c.OwnerId == accountId);

            var messageContents = _db.Set<MessageContent>();

            if (messageLinks.All(c => c.Id != id || c.OwnerId == accountId))
            {
                var messageContent = messageContents.FirstOrDefault(c => c.Id == messageLink.MessageContentId);
                messageContents.Remove(messageContent);
            }
        }
        _db.SaveChanges();
    }
    public void PinRow(int id)
    {
        var accountId = SenderId;
        var messageLinks = _db.Set<MessageLink>();
        var messageLink = messageLinks.FirstOrDefault(c => c.Id == id && c.OwnerId == accountId);
        messageLink.HasBeenPinned = !messageLink.HasBeenPinned;
        messageLinks.Update(messageLink);

        _db.SaveChanges();
    }
    public void MarkAsRead(int id)
    {
        var accountId = SenderId;
        var messageLinks = _db.Set<MessageLink>();
        var messageLink = messageLinks.FirstOrDefault(c => c.Id == id && c.OwnerId == accountId);
        var messageContents = _db.Set<MessageContent>();
        var messageContent = messageContents.FirstOrDefault(c => c.Id == messageLink.MessageContentId);
        messageContent.HasBeenSeen = true;
        messageContents.Update(messageContent);

        _db.SaveChanges();
    }

    private IQueryable<ShownSendedMessage> GetShownSendedMessages()
    {
        var messageContent = _db.Set<MessageContent>();
        var data = _db.Set<MessageLink>().Where(c => c.SenderId == SenderId && c.OwnerId == SenderId)
            .Where(c => c.Time <= DateTime.Now)
            .Select(c => new
            {
                c.Id,
                c.ReceiverId,
                c.SenderId,
                c.OwnerId,
                c.HasBeenPinned,
                c.Receiver.Name,
                c.Receiver.Picture,
                c.MessageContentId,
                c.Time,
            })
            .Join(messageContent, l => l.MessageContentId, c => c.Id, (l, m) => new ShownSendedMessage
            {
                Id = l.Id,
                Image = Convert.ToBase64String(l.Picture),
                To = l.Name,
                Subject = m.Title + ": " + m.Text,
                Sended = l.Time.ToString(),
                HasBeenSeen = m.HasBeenSeen,
                HasBeenPinned = l.HasBeenPinned,
            });

        return data;
    }
    private string ConvertDateTime(string dateTime)
    {
        var newDateTime = dateTime.Substring(0, 16);
        return newDateTime;
    }
}

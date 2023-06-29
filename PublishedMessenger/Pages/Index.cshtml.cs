using DatabaseLibrary;
using Massenger.ProcessClasses.AppHub;
using Massenger.ProcessClasses.AppPage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.SignalR;
using ModelsLibrary.Models;
using ModelsLibrary.NotificationModels;
using Newtonsoft.Json;
using System.Security.Claims;

namespace Massenger.Pages.Index;

[Authorize(Roles = "Admin,User")]
public class IndexModel : AppPageModel
{
    private readonly MyDatabaseContext _db;
    private readonly IHubContext<NotificationHub> _hub;

    public IndexModel(MyDatabaseContext db, IHubContext<NotificationHub> hub)
    {
        _db = db;
        _hub = hub;
    }

    public override IActionResult ExtendedOnGet()
    {
        _db.SetData();

        var page = Page();
        return page;
    }

    public List<NotificationData> GetNotifications()
    {
        var accountId = GetAccountId();
        var accounts = _db.Set<ModelsLibrary.Models.Account>();
        var notificationsData = _db.Set<Notification>().Where(c => c.ReceiverId == accountId)
            .Join(accounts, c => c.SenderId, c => c.Id, (n, a) => new { Id = n.Id, ReceiverId = n.ReceiverId, SenderId = n.SenderId, SenderName = a.Name })
            .Select(c => new NotificationData
            {
                Id = c.Id,
                ReceiverId = c.ReceiverId,
                SenderId = c.SenderId,
                SenderName = c.SenderName,
            }).ToList();
        foreach (var notificationData in notificationsData)
        {
            var notification = new Notification { Id = notificationData.Id };
            _db.Remove(notification);
        }
        _db.SaveChanges();

        return notificationsData;
    }

    private int GetAccountId()
    {
        var accountId = Convert.ToInt16(User.Claims.ToList().Find(c => c.Type == ClaimTypes.NameIdentifier).Value);
        return accountId;
    }

    private void SetDbData()
    {
    }
}

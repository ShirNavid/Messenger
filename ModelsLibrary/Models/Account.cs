using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsLibrary.Models;

public class Account : Entity
{
    public string Name { get; set; }
    public string Password { get; set; }
    public byte[] Picture { get; set; }
    public int RoleId { get; set; }

    public virtual Role Role { get; set; }
    public virtual ICollection<Notification> NotificationSenders { get; set; }
    public virtual ICollection<Notification> NotificationReceivers { get; set; }
    public virtual ICollection<MessageLink> Receivers { get; set; }
    public virtual ICollection<MessageLink> Senders { get; set; }
    public virtual ICollection<MessageLink> Owners { get; set; }
}

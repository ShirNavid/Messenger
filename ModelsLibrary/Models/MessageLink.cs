using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsLibrary.Models;

public class MessageLink : Entity
{
    public int MessageContentId { get; set; }
    public int ReceiverId { get; set; }
    public int SenderId { get; set; }
    public int OwnerId { get; set; }
    public DateTime Time { get; set; }
    public bool HasBeenPinned { get; set; }

    public virtual MessageContent MessageContent { get; set; }
    public virtual Account Receiver { get; set; }
    public virtual Account Sender { get; set; }
    public virtual Account Owner { get; set; }
}

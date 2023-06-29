using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsLibrary.Models;

public class Notification : Entity
{
    public int SenderId { get; set; }
    public virtual Account Sender { get; set; }

    public int ReceiverId { get; set; }
    public virtual Account Receiver { get; set; }
}

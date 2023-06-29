using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsLibrary.NotificationModels;

public class NotificationData : Entity
{
    public int ReceiverId { get; set; }
    public int SenderId { get; set; }
    public string SenderName { get; set; }
}

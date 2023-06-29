using ProcessModelsLibrary.Attributes;
using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsLibrary.ShownModels;

public class ShownSendedMessage : GridEntity
{
    public string To { get; set; }
    public string Subject { get; set; }
    public string Sended { get; set; }
}

using ProcessModelsLibrary.Attributes;
using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsLibrary.ShownModels;

public class ShownReceivedMessage : GridEntity
{
    public string From { get; set; }
    public string Subject { get; set; }
    public string Received { get; set; }
}

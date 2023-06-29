using ComponentLibrary.MainClasses;
using MessageDisplayerLibrary.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessageDisplayerLibrary.MainClasses;

public class MessageDisplayer : WebComponent<MessageDisplayerData>, IMessageDisplayer
{
    public List<MessageData> MessagesData { get; set; }
}

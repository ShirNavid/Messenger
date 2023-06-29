using ComponentLibrary.Interfaces;
using MessageDisplayerLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessageDisplayerLibrary.Interfaces;

public interface IMessageDisplayer : IWebComponent
{
    List<MessageData> MessagesData { get; set; }
}

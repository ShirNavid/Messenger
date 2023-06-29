using MessageDisplayerLibrary.Interfaces;
using MessageDisplayerLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Massenger.ProcessClasses.AppPage;

public abstract partial class AppPageModel
{
    public List<MessageData> GetMessagesData(string messageDisplayerId)
    {
        var messageDisplayer = GetWebComponent(messageDisplayerId) as IMessageDisplayer;
        var messagesData = messageDisplayer.MessagesData;
        return messagesData;
    }
}

using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsLibrary.Models;

public class MessageContent : Entity
{
    public int? BaseMessageContentId { get; set; }
    public string Title { get; set; }
    public string Text { get; set; }
    public bool HasBeenSeen { get; set; }

    public virtual FileData FileData { get; set; }
    public virtual MessageContent BaseMessageContent { get; set; }
    public virtual ICollection<MessageContent> ChildMessageContents { get; set; }
    public virtual ICollection<MessageLink> MessageLinks { get; set; }
}

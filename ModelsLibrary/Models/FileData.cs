using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsLibrary.Models;

public class FileData : Entity
{
    public string Name { get; set; }
    public byte[] Content { get; set; }
    public string Type { get; set; }
    public int MessageContentId { get; set; }
    public virtual MessageContent MessageContent { get; set; }
}

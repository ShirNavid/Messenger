using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessageDisplayerLibrary.MainClasses;

public class MessageData
{
    public bool IsSenderMe { get; set; }
    public string Title { get; set; }
    public string Text { get; set; }
    public string DateTime { get; set; }
    public int FileId { get; set; }
    public string FileName { get; set; }
}

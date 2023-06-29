using ComponentLibrary.MainClasses;

namespace GridLibrary.MainClasses;

public class GridData : WebComponentData
{
    public int PageNumber { get; set; }
    public string SearchedText { get; set; }
    public List<KeyValuePair<string, bool>> ColumnsOrder { get; set; }
}

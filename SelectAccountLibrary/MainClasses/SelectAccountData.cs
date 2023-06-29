using ComponentLibrary.MainClasses;

namespace SelectAccountLibrary.MainClasses;

public class SelectAccountData : WebComponentData
{
    public List<AccountData> AccountsData { get; set; }
    public string SearchedText { get; set; }
}

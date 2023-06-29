using SelectAccountLibrary.Interfaces;
using SelectAccountLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Massenger.ProcessClasses.AppPage;

public abstract partial class AppPageModel
{
    public List<AccountData> GetAccountsData(string selectAccountId, int replyId, int senderId, int mainReceiverId)
    {
        var selectAccount = GetWebComponent(selectAccountId) as ISelectAccount;
        var accountsData = selectAccount.GetAccountsData(replyId, senderId, mainReceiverId);
        return accountsData;
    }
    public AccountData GetRepliedAccountData(string selectAccountId, int mainReceiverId)
    {
        var selectAccount = GetWebComponent(selectAccountId) as ISelectAccount;
        var accountData = selectAccount.GetRepliedAccountData(mainReceiverId);
        return accountData;
    }
    public void SelectSearch(string selectAccountId, string searchedText)
    {
        var selectAccount = GetWebComponent(selectAccountId) as ISelectAccount;
        selectAccount.Search(searchedText);
    }
}
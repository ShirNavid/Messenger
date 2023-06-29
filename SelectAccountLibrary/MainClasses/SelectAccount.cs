using ComponentLibrary.MainClasses;
using SelectAccountLibrary.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SelectAccountLibrary.MainClasses;

public class SelectAccount : WebComponent<SelectAccountData>, ISelectAccount
{
    private List<AccountData> _accountsData;
    private string _searchedText;

    public SelectAccount()
    {
        _searchedText = String.Empty;
    }

    public void SetAccountsData(List<AccountData> accountsData)
    {
        _accountsData = accountsData;
    }
    public List<AccountData> GetAccountsData(int replyId, int senderId, int mainReceiverId)
    {
        var accounts = _accountsData.FindAll(c => c.Text.ToLower().Contains(_searchedText.ToLower()));
        if (replyId != 0)
        {
            AccountData account;

            account = accounts.FirstOrDefault(c => c.Id == senderId);
            if (account != null)
            {
                accounts.Remove(account);
            }

            account = accounts.FirstOrDefault(c => c.Id == mainReceiverId);
            if (account != null)
            {
                accounts.Remove(account);
            }
        }
        return accounts;
    }
    public AccountData GetRepliedAccountData(int mainReceiverId)
    {
        var account = _accountsData.Find(c => c.Id == mainReceiverId);
        return account;
    }
    public void Search(string searchedText)
    {
        _searchedText = searchedText;
    }

    public override SelectAccountData GetWebComponentData()
    {
        var selectAccountData = new SelectAccountData
        {
            WebComponentId = this.WebComponentId,
            AccountsData = _accountsData,
            SearchedText = _searchedText,
        };
        return selectAccountData;
    }
    public override void InitializeProperties(SelectAccountData data)
    {
        WebComponentId = data.WebComponentId;
        _accountsData = data.AccountsData;
        _searchedText = data.SearchedText;
    }
}

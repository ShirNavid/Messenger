using ComponentLibrary.Interfaces;
using SelectAccountLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SelectAccountLibrary.Interfaces;

public interface ISelectAccount : IWebComponent
{
    void SetAccountsData(List<AccountData> accountDatas);
    List<AccountData> GetAccountsData(int replyId, int senderId, int mainReceiverId);
    AccountData GetRepliedAccountData(int mainReceiverId);
    void Search(string searchedText);
}

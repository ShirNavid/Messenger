using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GridLibrary.Interfaces;

internal interface IReportProvider<TEntity> : IReportProvider where TEntity : GridEntity
{
    void SetData(params IQueryable<TEntity>[] data);
    IOrderedQueryable<TEntity> GetData();
}
internal interface IReportProvider
{
    List<KeyValuePair<string, bool>> GetColumnsOrder();
    void SetColumnsOrder(List<KeyValuePair<string, bool>> columnsOrder);

    string GetSearchedText();
    void SetSearchedText(string searchedText);
}

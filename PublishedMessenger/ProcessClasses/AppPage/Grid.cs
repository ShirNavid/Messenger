using GridLibrary.Interfaces;
using PageLibrary;
using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Massenger.ProcessClasses.AppPage;

public abstract partial class AppPageModel : ExtendedPageModel
{
    public string[] GetColumnNames(string gridId)
    {
        var grid = GetWebComponent(gridId) as IGrid;
        var tEntity = grid.GetType().GetGenericArguments()[0];
        var props = tEntity.GetProperties();
        var rawColumnNames = Array.ConvertAll(props, c => c.Name);
        var columnNames = Array.FindAll(rawColumnNames, c => c != "Id" && c != "Image" && c != "HasBeenSeen" && c != "HasBeenPinned");
        return columnNames;
    }
    public void SetColumnsOrder(string gridId, List<KeyValuePair<string, bool>> columnsOrder)
    {
        var grid = GetWebComponent(gridId) as IGrid;
        grid.SetColumnsOrder(columnsOrder);
    }
    public void Search(string gridId, string searchedText)
    {
        var grid = GetWebComponent(gridId) as IGrid;
        grid.Search(searchedText);
    }
    public IEnumerable<GridEntity> GetRows(string gridId)
    {
        var grid = GetWebComponent(gridId) as IGrid;
        var data = grid.GetRows();
        return data;
    }
    public void SetPageNumber(string gridId, int pageNumber)
    {
        var grid = GetWebComponent(gridId) as IGrid;
        grid.SetPageNumber(pageNumber);
    }
    public int GetPagesCount(string gridId)
    {
        var grid = GetWebComponent(gridId) as IGrid;
        var pagesCount = grid.GetPagesCount();
        return pagesCount;
    }
}

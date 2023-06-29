using ComponentLibrary.Interfaces;
using GridLibrary.Interfaces;
using GridLibrary.MainClasses;
using GridLibrary.ProcessClasses;
using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GridLibrary.Interfaces;

public interface IGrid<TEntity> :IGrid
where TEntity : GridEntity
{
    void SetData(params IQueryable<TEntity>[] data);
    void AddConvertor(Func<TEntity, TEntity> func);
}

public interface IGrid : IWebComponent
{
    void SetPagingProps(int pageSize);

    void SetColumnsOrder(List<KeyValuePair<string, bool>> columnsOrder);
    void Search(string searchedText);

    IEnumerable<GridEntity> GetRows();
    IEnumerable<GridEntity> GetAllRows();
    void SetPageNumber(int pageNumber);
    int GetPagesCount();
}




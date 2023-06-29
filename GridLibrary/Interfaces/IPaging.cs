using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GridLibrary.Interfaces;

internal interface IPaging<TEntity> : IPaging where TEntity : GridEntity
{
    void SetData(IOrderedQueryable<TEntity> data);

    IQueryable<TEntity> GetRows();
    IQueryable<TEntity> GetAllRows();
}

internal interface IPaging
{
    int PageNumber { get; set; }

    void SetPagingProps(int pageSize);
    int GetPagesCount();
}

using GridLibrary.Interfaces;
using InstanceFactoryLibrary.MainClasses;
using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GridLibrary.ProcessClasses;

[SampleOf(typeof(IPaging<>))]
internal class Paging<TEntity> : IPaging<TEntity>
where TEntity : GridEntity
{
    private int _pageSize;
    private int _allRowsCount;
    private IOrderedQueryable<TEntity> _data;

    public int PageNumber { get; set; }

    public Paging()
    {
        PageNumber = 1;
    }

    public void SetPagingProps(int pageSize)
    {
        _pageSize = pageSize;
    }
    public void SetData(IOrderedQueryable<TEntity> data)
    {
        _data = data;
        _allRowsCount = _data.Count();
    }
    
    public IQueryable<TEntity> GetRows()
    {
        var pageSize = GetPageSize();
        var data = _data.Skip((PageNumber - 1) * _pageSize).Take(pageSize);
        return data;
    }
    public IQueryable<TEntity> GetAllRows()
    {
        return _data;
    }

    public int GetPagesCount()
    {
        double doublePagesCount = (double)_allRowsCount / (double)_pageSize;
        int pagesCount = Convert.ToInt16(Math.Ceiling(doublePagesCount));
        return pagesCount;
    }

    private int GetPageSize()
    {
        var leftRows = _allRowsCount - ((PageNumber - 1) * _pageSize);
        var pageSize = Math.Min(leftRows, _pageSize);
        return pageSize;
    }
}

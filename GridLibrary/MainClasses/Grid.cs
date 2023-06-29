using ComponentLibrary.MainClasses;
using GridLibrary.Interfaces;
using GridLibrary.ProcessClasses;
using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace GridLibrary.MainClasses;

public class Grid<TEntity> : WebComponent<GridData>, IGrid<TEntity>
where TEntity : GridEntity
{
    private readonly AppInstanceFactory _factory = new();

    private readonly IReportProvider<TEntity> _reportProvider;
    private readonly IPaging<TEntity> _paging;
    private readonly List<Converter<TEntity, TEntity>> _converters;

    public Grid() : base()
    {
        _reportProvider = _factory.CreateInstance<IReportProvider<TEntity>>();
        _paging = _factory.CreateInstance<IPaging<TEntity>>();
        _converters = new();
    }

    public override GridData GetWebComponentData()
    {
        var gridData = new GridData()
        {
            WebComponentId = this.WebComponentId,
            PageNumber = _paging.PageNumber,
            ColumnsOrder = _reportProvider.GetColumnsOrder(),
            SearchedText = _reportProvider.GetSearchedText()
        };

        return gridData;
    }
    public override void InitializeProperties(GridData data)
    {
        WebComponentId = data.WebComponentId;
        _paging.PageNumber = data.PageNumber;
        _reportProvider.SetColumnsOrder(data.ColumnsOrder);
        _reportProvider.SetSearchedText(data.SearchedText);
        SetData();
    }

    public void SetData(params IQueryable<TEntity>[] data)
    {
        _reportProvider.SetData(data);
        var orderedData = _reportProvider.GetData();
        _paging.SetData(orderedData);
    }
    public void SetPagingProps(int pageSize)
    {
        _paging.SetPagingProps(pageSize);
    }
    public void AddConvertor(Func<TEntity, TEntity> func)
    {
        _converters.Add(new Converter<TEntity, TEntity>(func));
    }

    public void SetColumnsOrder(List<KeyValuePair<string, bool>> columnsOrder)
    {
        _reportProvider.SetColumnsOrder(columnsOrder);
        SetData();
    }
    public void Search(string searchedText)
    {
        _reportProvider.SetSearchedText(searchedText);
        SetData();
    }

    public IEnumerable<GridEntity> GetAllRows()
    {
        var rawData = _paging.GetAllRows().ToList();
        var data = GetConvertedEntities(rawData);
        return data;
    }
    public IEnumerable<GridEntity> GetRows()
    {
        var rawData = _paging.GetRows().ToList();
        var data = GetConvertedEntities(rawData);
        return data;
    }

    public void SetPageNumber(int pageNumber)
    {
        _paging.PageNumber = pageNumber;
    }
    public int GetPagesCount()
    {
        var pagesCount = _paging.GetPagesCount();
        return pagesCount;
    }

    private void SetData()
    {
        var data = _reportProvider.GetData();
        _paging.SetData(data);
    }
    private List<TEntity> GetConvertedEntities(List<TEntity> entities)
    {
        _converters.ForEach(c => entities = entities.ConvertAll(c));
        return entities;
    }
}

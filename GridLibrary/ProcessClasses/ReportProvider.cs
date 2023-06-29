using GridLibrary.Interfaces;
using InstanceFactoryLibrary.MainClasses;
using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GridLibrary.ProcessClasses;

[SampleOf(typeof(IReportProvider<>))]
internal class ReportProvider<TEntity> : IReportProvider<TEntity>
where TEntity : GridEntity
{
    private readonly AppInstanceFactory _factory = new();
    
    private readonly IOrderInfo<TEntity> _orderInfo;
    private readonly ISearchInfo<TEntity> _searchInfo;

    private List<IQueryable<TEntity>> _data;

    public ReportProvider()
    {
        _orderInfo = _factory.CreateInstance<IOrderInfo<TEntity>>();
        _searchInfo = _factory.CreateInstance<ISearchInfo<TEntity>>();

        _data = new List<IQueryable<TEntity>>();
    }

    public List<KeyValuePair<string, bool>> GetColumnsOrder()
    {
        return _orderInfo.ColumnsOrder;
    }
    public void SetColumnsOrder(List<KeyValuePair<string, bool>> columnsOrder)
    {
        _orderInfo.ColumnsOrder = columnsOrder;
    }

    public string GetSearchedText()
    {
        return _searchInfo.SearchedText;
    }
    public void SetSearchedText(string searchedText)
    {
        _searchInfo.SearchedText = searchedText;
    }

    public void SetData(params IQueryable<TEntity>[] data)
    {
        _data = data.ToList();
    }
    public IOrderedQueryable<TEntity> GetData()
    {
        var data = GetDataSource();
        var searchedData = GetSearchedData(data);
        var orderedSearchedData = GetOrderedData(searchedData);

        return orderedSearchedData;
    }

    private IQueryable<TEntity> GetDataSource()
    {
        var data = _data[0];

        for (int i = 1; i < _data.Count; i++)
        {
            var dataUnit = _data[i];
            data = data.Union(dataUnit);
        }

        return data;
    }
    private IQueryable<TEntity> GetSearchedData(IQueryable<TEntity> data)
    {
        var predicate = _searchInfo.GetExpression();
        var searchedData = data.Where(predicate);
        return searchedData;
    }
    private IOrderedQueryable<TEntity> GetOrderedData(IQueryable<TEntity> data)
    {
        var order = _orderInfo.GetExpressions();
        var orderedData = Enumerable.Empty<TEntity>().OrderBy(c => c.Id) as IOrderedQueryable<TEntity>;
        for (int i = 0; i < order.Count; i++)
        {
            var orderDetails = order[i];
            var expression = orderDetails.GetExpression();
            var funcReturnedType = (expression.GetType() as Type)
                .GetGenericArguments()[0].GetGenericArguments()[1];

            if (i == 0)
            {
                if (orderDetails.GetOrderType() == AscendingOrDescnding.Ascending)
                {
                    var orderByMethod = typeof(Queryable).GetMethods().First(c => c.Name == "OrderBy")
                        .MakeGenericMethod(typeof(TEntity), funcReturnedType);
                    orderedData = orderByMethod.Invoke(data, new object[] { data, expression }) as IOrderedQueryable<TEntity>;
                }
                else
                {
                    var orderByMethod = typeof(Queryable).GetMethods().First(c => c.Name == "OrderByDescending")
                        .MakeGenericMethod(typeof(TEntity), funcReturnedType);
                    orderedData = orderByMethod.Invoke(data, new object[] { data, expression }) as IOrderedQueryable<TEntity>;
                }
            }
            else
            {
                if (orderDetails.GetOrderType() == AscendingOrDescnding.Ascending)
                {
                    var orderByMethod = typeof(Queryable).GetMethods().First(c => c.Name == "ThenBy")
                        .MakeGenericMethod(typeof(TEntity), funcReturnedType);
                    orderedData = orderByMethod.Invoke(data, new object[] { orderedData, expression }) as IOrderedQueryable<TEntity>;
                }
                else
                {
                    var orderByMethod = typeof(Queryable).GetMethods().First(c => c.Name == "ThenByDescending")
                        .MakeGenericMethod(typeof(TEntity), funcReturnedType);
                    orderedData = orderByMethod.Invoke(data, new object[] { orderedData, expression }) as IOrderedQueryable<TEntity>;
                }
            }
        }

        return orderedData;
    }

}

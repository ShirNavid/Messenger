using System.Text;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Collections.Generic;
using GridLibrary.Interfaces;
using InstanceFactoryLibrary.MainClasses;
using ProcessModelsLibrary.MainClasses;

namespace GridLibrary.ProcessClasses;

[SampleOf(typeof(IOrderDetail<>))]
internal class OrderDetail<TEntity> : IOrderDetail<TEntity>
where TEntity : GridEntity
{
    private Expression<Func<TEntity, string>> _stringExpressionOrder;
    private Expression<Func<TEntity, int>> _intExpressionOrder;
    private Expression<Func<TEntity, Int64>> _int64ExpressionOrder;
    private Expression<Func<TEntity, bool>> _boolExpressionOrder;
    private AscendingOrDescnding _orderType;

    public OrderDetail(Expression<Func<TEntity, int>> intExpressionOrder, AscendingOrDescnding orderType)
    {
        _intExpressionOrder = intExpressionOrder;
        _orderType = orderType;
    }
    public OrderDetail(Expression<Func<TEntity, Int64>> int64ExpressionOrder, AscendingOrDescnding orderType)
    {
        _int64ExpressionOrder = int64ExpressionOrder;
        _orderType = orderType;
    }
    public OrderDetail(Expression<Func<TEntity, string>> stringExpressionOrder, AscendingOrDescnding orderType)
    {
        _stringExpressionOrder = stringExpressionOrder;
        _orderType = orderType;
    }
    public OrderDetail(Expression<Func<TEntity, bool>> boolExpressionOrder, AscendingOrDescnding orderType)
    {
        _boolExpressionOrder = boolExpressionOrder;
        _orderType = orderType;
    }

    public dynamic GetExpression()
    {
        dynamic expression = null;
        if (_stringExpressionOrder != null)
        {
            expression = _stringExpressionOrder;
        }
        else if (_intExpressionOrder != null)
        {
            expression = _intExpressionOrder;
        }
        else if (_int64ExpressionOrder != null)
        {
            expression = _int64ExpressionOrder;
        }
        else if (_boolExpressionOrder != null)
        {
            expression = _boolExpressionOrder;
        }
        return expression;
    }
    public AscendingOrDescnding GetOrderType()
    {
        return _orderType;
    }
}

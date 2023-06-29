using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using GridLibrary.Interfaces;
using GridLibrary.ProcessClasses;
using InstanceFactoryLibrary.MainClasses;
using ProcessModelsLibrary.MainClasses;

namespace RepositoryLibrary.ProcessClasses;

[SampleOf(typeof(IOrderInfo<>))]
internal class OrderInfo<TEntity> : IOrderInfo<TEntity>
where TEntity : GridEntity
{
    public List<KeyValuePair<string, bool>> ColumnsOrder { get; set; }

    public OrderInfo()
    {
        ColumnsOrder = new List<KeyValuePair<string, bool>>();
    }

    public List<IOrderDetail<TEntity>> GetExpressions()
    {
        ColumnsOrder.Insert(0, new KeyValuePair<string, bool>("HasBeenPinned", false));
        if (!ColumnsOrder.Any(c => c.Key == "Id"))
        {
            ColumnsOrder.Add(new KeyValuePair<string, bool>("Id", true));
        }

        var orderList = new List<IOrderDetail<TEntity>>();

        foreach (var columnDescription in ColumnsOrder)
        {
            string dataName = columnDescription.Key;
            Type dataType;

            var entityParameter = Expression.Parameter(typeof(TEntity), "entity");
            Expression dataExpression;
            if (typeof(TEntity).GetProperties().Any(c => c.Name == dataName))
            {
                dataExpression = Expression.Property(entityParameter, dataName);
                dataType = typeof(TEntity).GetProperty(dataName).PropertyType;
            }
            else
            {
                var method = typeof(TEntity).GetMethods().FirstOrDefault(
                    method => method.GetCustomAttributes(false).Any(
                        attribute => attribute.ToString() == dataName));
                dataExpression = Expression.Call(entityParameter, method);
                dataType = method.ReturnType;
            }

            var funcType = typeof(Func<,>).MakeGenericType(typeof(TEntity), dataType);

            var expressionOrder = Expression.Lambda(funcType, dataExpression, entityParameter);
            AscendingOrDescnding orderType;
            if (columnDescription.Value)
            {
                orderType = AscendingOrDescnding.Ascending;
            }
            else
            {
                orderType = AscendingOrDescnding.Descnding;
            }

            var constructor = typeof(OrderDetail<TEntity>).GetConstructor(new Type[] { typeof(Expression<>).MakeGenericType(funcType), typeof(AscendingOrDescnding) });
            var orderDetails = constructor.Invoke(new object[] { expressionOrder, orderType }) as IOrderDetail<TEntity>;
            orderList.Add(orderDetails);
        }

        return orderList;
    }
}

using GridLibrary.ProcessClasses;
using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GridLibrary.Interfaces;

public interface IOrderDetail<TEntity>
where TEntity : Entity
{
    dynamic GetExpression();
    AscendingOrDescnding GetOrderType();
}

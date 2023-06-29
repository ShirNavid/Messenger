using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InstanceFactoryLibrary.MainClasses;
using ProcessModelsLibrary.MainClasses;

namespace GridLibrary.Interfaces;

internal interface IOrderInfo<TEntity> where TEntity : GridEntity
{
    List<KeyValuePair<string, bool>> ColumnsOrder { get; set; }
    
    List<IOrderDetail<TEntity>> GetExpressions();
}


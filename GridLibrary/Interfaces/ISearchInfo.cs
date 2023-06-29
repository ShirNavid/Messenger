using ProcessModelsLibrary.MainClasses;
using RepositoryLibrary.ProcessClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace GridLibrary.Interfaces;

public interface ISearchInfo<TEntity> where TEntity : GridEntity
{
    string SearchedText { get; set; }

    Expression<Func<TEntity, bool>> GetExpression();
}


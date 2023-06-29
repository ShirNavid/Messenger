using GridLibrary.Interfaces;
using InstanceFactoryLibrary.MainClasses;
using ProcessModelsLibrary.MainClasses;
using ProcessModelsLibrary.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace GridLibrary.ProcessClasses;

[SampleOf(typeof(ISearchInfo<>))]
internal class SearchInfo<TEntity> : ISearchInfo<TEntity>
where TEntity : GridEntity
{
    public string SearchedText { get; set; }

    public SearchInfo()
    {
        SearchedText = string.Empty;
    }

    public Expression<Func<TEntity, bool>> GetExpression()
    {
        Expression<Func<TEntity, bool>> expression = entity => true;

        var entityParameter = Expression.Parameter(typeof(TEntity), "entity");
        var properties = GetProps();

        Expression propertyExpression;
        Expression toStringExpression;
        Expression toLowerExpression;
        Expression containsExpression;
        Expression orExpression = Expression.Constant(false, typeof(bool));
        foreach (var property in properties)
        {
            propertyExpression = Expression.Property(entityParameter, property);
            var PropertyType = (typeof(TEntity).GetProperty(property).PropertyType);
            if (PropertyType != typeof(string))
            {
                toStringExpression = Expression.Call(propertyExpression, PropertyType.GetMethod("ToString", new Type[] { }), new Expression[] { });
            }
            else
            {
                toStringExpression = propertyExpression;
            }
            toLowerExpression = Expression.Call(toStringExpression, typeof(string).GetMethod("ToLower", new Type[] { }), new Expression[] { });
            containsExpression = Expression.Call(toLowerExpression, typeof(string).GetMethod("Contains", new Type[] { typeof(string) }), new Expression[] { Expression.Constant(SearchedText.Trim().ToLower(), typeof(string)) });
            orExpression = Expression.Or(orExpression, containsExpression);
        }
        expression = Expression.Lambda<Func<TEntity, bool>>(orExpression, entityParameter);

        return expression;
    }

    private List<string> GetProps()
    {
        var allProperties = typeof(TEntity).GetProperties().ToList();
        var properties = allProperties.FindAll(c => !c.GetCustomAttributes(true)
        .Any(c => c is NotBeingSearchedAttribute))
        .ConvertAll(c => c.Name);
        return properties;
    }
    private string GetUpper(string text)
    {
        return text[0].ToString().ToUpper() + text.Substring(1);
    }
}

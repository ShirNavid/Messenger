using InstanceFactoryLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InstanceFactoryLibrary;

public abstract class InstanceFactory
{
    public T CreateInstance<T>()
    {
        var instance = CreateInstanceInDom<T>();
        if (instance == null)
        {
            if (typeof(T).IsInterface)
            {
                try
                {
                    instance = (T)(Activator.CreateInstance(null, nameof(T).Substring(1)) as object);
                }
                catch (Exception) { }
            }
        }

        return instance;
    }
    public T CreateInstanceInDom<T>()
    {
        T instance = default(T);

        var interfaceType = typeof(T);
        Type classType = null;
        var assembly = this.GetType().Assembly;
        var allTypes = assembly.DefinedTypes.ToList().ConvertAll(c => c.AsType());
        foreach (var type in allTypes)
        {
            var attributes = Array.ConvertAll(type.GetCustomAttributes(typeof(SampleOfAttribute), true), c => c as SampleOfAttribute);
            if (attributes.Any(c => c.GetPairedInterface() == GetMainType<T>()))
            {
                classType = type;
                break;
            }
        }

        if (classType != null)
        {
            instance = (T)MakeGenericType<T>(classType).GetConstructor(new Type[] { }).Invoke(new object[] { });
        }
        else
        {
            var assemblies = AppDomain.CurrentDomain.GetAssemblies().ToList().FindAll(c => c != assembly);
            foreach (var subAssembly in assemblies)
            {
                var subAssemblyTypes = Array.FindAll(subAssembly.GetTypes(), c => c.BaseType != null);
                if (subAssemblyTypes.Any(c => c.BaseType.Name == nameof(InstanceFactory)))
                {
                    try
                    {
                        var type = subAssemblyTypes.FirstOrDefault(c => c.BaseType.Name == nameof(InstanceFactory));
                        var factory = type.GetConstructor(new Type[] { }).Invoke(new object[] { });
                        var method = type.GetMethod(nameof(CreateInstanceInDom)).MakeGenericMethod(typeof(T));
                        instance = (T)method.Invoke(factory, new object[] { });
                    }
                    catch (Exception) { }
                    if (instance != null)
                    {
                        break;
                    }
                }
            }
        }

        return instance;
    }

    private Type GetMainType<T>()
    {
        Type type = null;
        var isGeneric = typeof(T).IsGenericType;
        if (isGeneric)
        {
            type = typeof(T).GetGenericTypeDefinition();
        }

        else
        {
            type = typeof(T);
        }

        return type;
    }
    private Type MakeGenericType<T>(Type mainType)
    {
        Type type = null;
        var isGeneric = typeof(T).IsGenericType;
        if (isGeneric)
        {
            var types = typeof(T).GetGenericArguments();
            type = mainType.MakeGenericType(types);
        }

        else
        {
            type = mainType;
        }

        return type;
    }
}

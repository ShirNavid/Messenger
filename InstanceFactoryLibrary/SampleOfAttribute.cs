namespace InstanceFactoryLibrary.MainClasses;

public class SampleOfAttribute : Attribute
{
    private readonly Type _type;

    public SampleOfAttribute(Type type)
    {
        _type = type;
    }

    public Type GetPairedInterface()
    {
        return _type;
    }
}

using ComponentLibrary.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComponentLibrary.MainClasses;

public abstract class WebComponent<TWebComponentData> : IWebComponent<TWebComponentData>
    where TWebComponentData : WebComponentData
{
    public string WebComponentId { get; set; }

    public WebComponent()
    {
        WebComponentId = Guid.NewGuid().ToString();
    }

    public virtual void InitializeProperties(TWebComponentData data)
    {
        var props = data.GetType().GetProperties();
        Array.ForEach(props, (dataProp) => {
            var prop = this.GetType().GetProperty(dataProp.Name);
            var value = dataProp.GetValue(data);
            prop.SetValue(this, value);
        });
    }
    public virtual TWebComponentData GetWebComponentData()
    {
        var webComponentData = typeof(TWebComponentData).GetConstructor(new Type[] { }).Invoke(new object[] { }) as TWebComponentData;
        var props = webComponentData.GetType().GetProperties();
        Array.ForEach(props, (dataProp) => {
            var prop = this.GetType().GetProperty(dataProp.Name);
            var value = prop.GetValue(this);
            dataProp.SetValue(webComponentData, value);
        });
        return webComponentData;
    }

    public Type GetWebComponentDataType()
    {
        return typeof(TWebComponentData);
    }
}

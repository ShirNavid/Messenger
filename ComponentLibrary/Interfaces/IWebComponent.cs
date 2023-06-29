using ComponentLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComponentLibrary.Interfaces;

public interface IWebComponent
{
    string WebComponentId { get; set; }
    Type GetWebComponentDataType();
}
public interface IWebComponent<TWepComponentData> : IWebComponent
    where TWepComponentData : WebComponentData
{
    string WebComponentId { get; set; }
    Type GetWebComponentDataType();

}

using ComponentLibrary.Interfaces;
using ComponentLibrary.MainClasses;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using StringWorkLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace PageLibrary;

public abstract class ExtendedPageModel : PageModel
{
    public string pageUrl;
    public string initialState;

    protected Dictionary<string, dynamic> urlParameters;

    public IActionResult OnGet()
    {
        pageUrl = Request.Path.Value;
        urlParameters = new Dictionary<string, dynamic>();
        if (Request.QueryString.HasValue)
        {
            var encodedObject = Request.QueryString.Value.Substring(1, Request.QueryString.Value.Length - 1);
            var stringifiedObject = System.Web.HttpUtility.UrlDecode(encodedObject);
            urlParameters = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(stringifiedObject);
        }

        var page = ExtendedOnGet();

        initialState = GetState();

        return page;
    }

    public abstract IActionResult ExtendedOnGet();

    public IActionResult OnPostGetData(string state, string methodName, string stringifiedParameters)
    {
        SetComponents(state);
        var method = GetMethod(methodName);
        var parametersDictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(stringifiedParameters);
        var parameters = GetParameters(method, parametersDictionary);
        var result = method.Invoke(this, parameters);
        var newState = GetState();
        var ajaxData = new AjaxData
        {
            Result = result,
            State = newState,
        };
        var stringifiedData = JsonConvert.SerializeObject(ajaxData, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
        return Content(stringifiedData);
    }
    public IActionResult OnPostRunVoidMethod(string state, string methodName, string stringifiedParameters)
    {
        SetComponents(state);
        var method = GetMethod(methodName);
        var parametersDictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(stringifiedParameters);
        var parameters = GetParameters(method, parametersDictionary);
        method.Invoke(this, parameters);
        var newState = GetState();
        var ajaxData = new AjaxData
        {
            State = newState,
        };
        var stringifiedData = JsonConvert.SerializeObject(ajaxData, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
        return Content(stringifiedData);
    }

    protected IWebComponent GetWebComponent(string webComponentId)
    {
        var webComponents = this.GetType().GetProperties().ToList().ConvertAll(c => c.GetValue(this) as IWebComponent).FindAll(c => c is IWebComponent);
        var webComponent = webComponents.FirstOrDefault(c => c.WebComponentId == webComponentId);
        return webComponent;
    }

    private void SetComponents(string state)
    {
        var stringifiedComponentsData = Cryptography.Decrypt(state);
        var componentsData = JsonConvert.DeserializeObject<Dictionary<string, string>>(stringifiedComponentsData);
        componentsData.ToList().ForEach((c) =>
        {
            var name = c.Key;
            var allProperties = this.GetType().GetProperties();
            var properties = Array.FindAll(allProperties, c => c.PropertyType.IsAssignableTo(typeof(IWebComponent)));
            var property = properties.FirstOrDefault(c => c.Name == name);
            var webComponent = property.GetValue(this) as IWebComponent;
            var webComponentDataType = webComponent.GetWebComponentDataType();
            var webComponentData = JsonConvert.DeserializeObject(c.Value, webComponentDataType);
            webComponent.GetType().GetMethod("InitializeProperties").Invoke(webComponent, new object[] { webComponentData });
        });
    }
    private MethodInfo GetMethod(string methodName)
    {
        var type = this.GetType();
        var method = type.GetMethod(methodName);
        return method;
    }
    private object[] GetParameters(MethodInfo method, Dictionary<string, object> parametersDictionary)
    {
        var parameters = method.GetParameters().ToList();
        var convertedParameters = new List<object> { };
        void ParameterAction(ParameterInfo parameter)
        {
            var type = parameter.ParameterType;
            var name = parameter.Name;
            var value = parametersDictionary[name];
            var jsonParameter = JsonConvert.SerializeObject(value);
            var convertedParameter = JsonConvert.DeserializeObject(jsonParameter, type);
            convertedParameters.Add(convertedParameter);
        }
        parameters.ForEach(ParameterAction);

        return convertedParameters.ToArray();
    }
    private string GetState()
    {
        var dictionary = new Dictionary<string, string>();
        var allProperties = this.GetType().GetProperties();
        var properties = Array.FindAll(allProperties, c => c.PropertyType.IsAssignableTo(typeof(IWebComponent)));
        foreach (var property in properties)
        {
            var key = property.Name;
            var webComponent = property.GetValue(this) as IWebComponent;
            var webComponentData = webComponent.GetType().GetMethod("GetWebComponentData").Invoke(webComponent, new object[] { });
            var value = JsonConvert.SerializeObject(webComponentData);
            dictionary.Add(key, value);
        }
        var state = JsonConvert.SerializeObject(dictionary);
        var encryptedState = Cryptography.Encrypt(state);
        return encryptedState;
    }
}



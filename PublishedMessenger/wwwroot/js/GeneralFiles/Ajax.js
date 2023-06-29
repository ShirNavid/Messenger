globalThis.getData = function (methodName, parameters) {
    let data;
    let result;
    $.ajax({
        url: globalThis.pageUrl + "?handler=GetData",
        type: 'POST',
        async: false,
        data: { "state": globalThis.state, "methodName": methodName, "stringifiedParameters": JSON.stringify(parameters) },
        headers: { "XSRF-TOKEN": document.querySelector('input[name="__RequestVerificationToken"]').value },
        success: function (info) {
            data = JSON.parse(info);
            globalThis.state = data.state;
            result = data.result;
        }
    });
    return result;
}

globalThis.runVoidMethod = function (methodName, parameters) {
    let data;
    $.ajax({
        url: globalThis.pageUrl + "?handler=RunVoidMethod",
        type: 'POST',
        async: false,
        data: { "state": globalThis.state, "methodName": methodName, "stringifiedParameters": JSON.stringify(parameters) },
        headers: { "XSRF-TOKEN": document.querySelector('input[name="__RequestVerificationToken"]').value },
        success: function (info) {
            data = JSON.parse(info);
            globalThis.state = data.state;
        }
    });
}


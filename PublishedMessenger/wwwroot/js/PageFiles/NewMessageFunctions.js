document.sendNewMessage = function (title, text, date, time, fileName, fileContent, fileType, mainAccountId, secondaryAccountIds) {
    const parameters =
    {
        "title": title,
        "text": text,
        "date": date,
        "time": time,
        "fileName": fileName,
        "fileContent": fileContent,
        "fileType": fileType,
        "mainAccountId": mainAccountId,
        "secondaryAccountIds": secondaryAccountIds,
    };
    runVoidMethod("SendNewMessage", parameters);
}


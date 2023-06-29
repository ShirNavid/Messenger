document.isPossibleToDelete = function (ids) {
    return getData("IsPossibleToDelete", { "ids": ids });
}

document.deleteMessages = function (ids) {
    runVoidMethod("DeleteMessages", { "ids": ids });
}

document.pinRow = function (id) {
    runVoidMethod("PinRow", { "id": id });
}

document.markAsRead = function (id) {
    runVoidMethod("MarkAsRead", { "id": id });
}

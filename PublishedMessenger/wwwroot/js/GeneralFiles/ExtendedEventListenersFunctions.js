export function extendedAddEventListener(element, eventName, eventFunction) {
    element.addEventListener(eventName, eventFunction);
    if (element.events == undefined) {
        element.events = [];
    }
    element.events.push({ "eventName": eventName, "eventFunction": eventFunction });
}

export function extendedRemoveEventListener(element, eventName, eventFunction) {
    element.events = element.events.filter(c => c.eventName != eventName || c.eventFunction != eventFunction);
    element.removeEventListener(eventName, eventFunction);
}



export const getData = function (methodName: string, parameters: Object): any {
    return globalThis.getData(methodName, parameters);
}

export const runVoidMethod = function (methodName: string, parameters: Object): void {
    globalThis.runVoidMethod(methodName, parameters);
}

export const createGuid = function (): string {
    return globalThis.createGuid();
}


export class KeyValuePair {
    constructor(key, value) {
        this._key = key;
        this._value = value;
    }
    getBackendObject() {
        const pair = {};
        pair.Key = this._key;
        pair.Value = this._value;
        return pair;
    }
}
//# sourceMappingURL=KeyValuePair.js.map
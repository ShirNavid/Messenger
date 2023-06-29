export class KeyValuePair<TKey, TValue> {

    public _key: TKey;
    public _value: TValue;

    constructor(key: TKey, value: TValue) {
        this._key = key;
        this._value = value;
    }

    public getBackendObject(): Object {

        const pair: Record<any, any> = {};
        pair.Key = this._key;
        pair.Value = this._value;

        return pair;
    }
}
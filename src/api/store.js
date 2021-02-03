export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKeyPrefix = key;
  }

  getItems(storeKey) {
    const key = this._getStoreKey(storeKey);
    try {
      return JSON.parse(this._storage.getItem(key)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(storeKey, items) {
    this._storage.setItem(
        this._getStoreKey(storeKey),
        JSON.stringify(items)
    );
  }

  setItem(storeKey, itemKey, value) {
    const items = this.getItems(storeKey);

    this._storage.setItem(
        this._getStoreKey(storeKey),
        JSON.stringify(
            Object.assign({}, items, {
              [itemKey]: value
            })
        )
    );
  }

  removeItem(storeKey, itemKey) {
    const items = this.getItems(storeKey);

    delete items[itemKey];

    this._storage.setItem(
        this._getStoreKey(storeKey),
        JSON.stringify(items)
    );
  }

  _getStoreKey(key) {
    return `${this._storeKeyPrefix}-${key}`;
  }
}

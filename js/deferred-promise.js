import Promise from 'bluebird'

export default class DeferredPromise {
  constructor () {
    this._promise = new Promise((resolve, reject) => {
      this._fulfillmentFn = (fn) => {
        try {
          fn(resolve, reject);
        } catch (error) {
          reject(error);
        }
      };
    });
  }

  promise () {
    return this._promise;
  }

  fulfill (fn) {
    if (!this._fulfillmentFn) { throw new Error('Promise already fulfilled'); }
    this._fulfillmentFn(fn);
    delete(this._fulfillmentFn);
  }
}

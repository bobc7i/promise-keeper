import DeferredPromise from '../js/deferred-promise'

describe('Deferred Promise', function() {
  beforeEach(() => {
    this.deferredPromise = new DeferredPromise();
  });

  it('should create a promise', () => {
    const promise = this.deferredPromise.promise();
    expect(promise.then).toBeDefined();
  });

  it('should resolve a promise', (done) => {
    const promise = this.deferredPromise.promise();
    promise.then((arg) => {
      expect(arg).toEqual('data');
      done();
    });
    this.deferredPromise.fulfill((resolve, reject) => {
      resolve('data');
    });
  });

  it('should reject a promise', (done) => {
    const promise = this.deferredPromise.promise();
    promise.then(null, (arg) => {
      expect(arg).toEqual('data');
      done();
    });
    this.deferredPromise.fulfill((resolve, reject) => {
      reject('data');
    });
  });

  it('should catch exceptions', (done) => {
    const promise = this.deferredPromise.promise();
    promise.catch((error) => {
      expect(error.message).toEqual('error');
      done();
    });
    this.deferredPromise.fulfill((resolve, reject) => {
      throw new Error('error');
    });
  });

  it('should only allow itself to be fulfilled once', () => {
    const promise = this.deferredPromise.promise();
    this.deferredPromise.fulfill((resolve, reject) => {
      resolve('data');
    });
    expect(() => this.deferredPromise.fulfill(() => {})).toThrow();
  });
});

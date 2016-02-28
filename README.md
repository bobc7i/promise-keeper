# promise-keeper
A module for managing deferred promises.
1
Deferred promises are considered an anti-pattern and for the
vast majority of cases they are.  But every so often you run into a situation where you need one.  Cases such as

```javascript
class Foo {
  constructor: () {
    this.promise = new Promise((resolve,reject) => {
      // Can't execute this function until init() is called.
    });
  }

  // This function returns a promise.  It can be called at anytime, even before init().  
  doSomething: () {
    return this.promise();
  }

  // Can only fulfill the promise returned from doSomething() once this function has been called.
  init: () {
    // Make an async call, then resolve or reject this.promise
  }
}
```

Bluebirdjs provides a pattern for handling [deferred promises](http://bluebirdjs.com/docs/api/deferred-migration.html).
The `DeferredPromise` class in this module encapsulates that patter and also lets exceptions that my occur while
fulfilling the promise bubble up the promise chain.

```javascript
import DeferredPromise from 'promise-keeper'

class Foo {
  constructor: () {
    this.deferredPromise = new DeferredPromise();
  }

  // This function returns a promise.  It can be called at anytime, even before init().  
  doSomething: () {
    return this.deferredPromise.promise();
  }

  // Can only fulfill the promise returned from doSomething() once this function has been called.
  init: (option) {
    this.deferredPromise.fulfill((resolve, reject) => {
      if (option === 1) {
        resolve('data');
      } else if (option === 2) {
        reject('error');
      } else {
        throw new Error('error');
      }
    });
  }
}
```

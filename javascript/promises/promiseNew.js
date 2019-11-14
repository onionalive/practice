// THis is a very basic example of a promise
// Missing some more cadvanced functionality

class PromiseNew {
  constructor(executeFunction) {
    this.promiseChain = [];
    this.handleError = () => {};

    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);

    executeFunction(this.onResolve, this.onReject);
  }

  then(onResolve) {
    this.promiseChain.push(onResolve);

    return this;
  }

  catch(handleError) {
    this.handleError = handleError;

    return this;
  }

  // Notice: Then & catch both return this, which makes it possible to
  // chain multiple `then()`'s when calling the promise since you are
  // returning the object itself.

  // In REAL promises, the return is actually an entirely new promise,
  // not `this`.

  onResolve(value) {
    let storedValue = value;

    try {
      this.promiseChain.forEach(nextFunction => {
        storedValue = nextFunction(storedValue);
      });
    } catch (error) {
      this.promiseChain = [];

      this.onReject(error);
    }
  }

  onReject(error) {
    this.handleError(error);
  }
}

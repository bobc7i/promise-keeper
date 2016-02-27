import Hello from '../js/hello'

describe('Hello', function() {
  beforeEach(() => {
    this.hello = new Hello();
  });

  it('should pass', () => {
    expect(this.hello).toBeDefined();
    expect(this.hello.one()).toEqual(1);
  });
});

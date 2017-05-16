# nanotiming [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

Small timing library. Useful to integrate into libraries that have multiple
methods. Only works in the browser, does nothing in Node.

## Usage
```js
var nanotiming = require('nanotiming')
var timing = nanotiming('my-timing')

timing.start('my-loop')
var i = 1000
while (--i) console.log(i)
timing.end('my-loop')

// Process marks when we have spare time available
window.requestIdleCallback(function () {
  var name = 'my-timing/my-loop'
  var timings = window.performance.getEntriesByName(name)
  console.log(timings[timings.length - 1]) // log the last entry
  performance.clearMeasures(name)          // be a good citizen and free up memory
})
```

## API
### `timing = nanotiming([instanceName])`
Create a new Nanotiming instance. Takes a name for the timing instance.

### `uuid = timing.start([methodName])`
Start a timing. Takes a method name. The method name is concatenated to the
instance name as `<instanceName>/<methodName>`. If no method name is passed,
it'll fall back to only using the instance name. It's recommended that per
instance to either always use method names, or never.

Returns a `uuid` that should be passed to `timing.end()` so async timings work.

### `timing.end(uuid, [methodName])`
End a timing. The name here must be the same as `timing.start()`. If you want
to do use this in async conditions make sure the name is unique, for example by
appending a unique id to both start and end. The `performance.measure()` step
is performed in a `requestIdleCallback()` tick, so make sure to process
measures asynchronously, and preferably in later idle callbacks.

Takes the uuid that is povided by `timing.start()` so async timings work.

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/nanotiming.svg?style=flat-square
[3]: https://npmjs.org/package/nanotiming
[4]: https://img.shields.io/travis/yoshuawuyts/nanotiming/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/nanotiming
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/nanotiming/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/nanotiming
[8]: http://img.shields.io/npm/dm/nanotiming.svg?style=flat-square
[9]: https://npmjs.org/package/nanotiming
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard

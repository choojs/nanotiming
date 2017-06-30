# nanotiming [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

Small timing library. Useful to integrate into libraries that have multiple
methods. Only works in the browser, does nothing in Node.

## Usage
```js
var nanotiming = require('nanotiming')

var loopTiming = nanotiming('my-timing.my-loop')
var i = 1000
while (--i) console.log(i)
loopTiming()

// Inspect timings when we have spare time available
window.requestIdleCallback(function () {
  var timings = window.performance.getEntries()
  var timing = timings[timings.length - 1]
  console.log(timing.name, timing.duration) // log the last entry
  performance.clearMeasures(timing.name)    // be a good citizen and free after use
})
```

## Timing names
Timings inside the view are appended with a unique UUID so they can be cleared
individually. While there's no strict format for timing formats, we recommend
using a format along these lines:
```txt
choo.render [12356778]
choo.route('/') [13355671]
choo.emit('log:debug') [13355675]
```

## Disabling timings
Performance timers are still a somewhat experimental technology. While they're
a great idea conceptually, there might be bugs. To disable timings complete,
set:
```js
window.localStorage.DISABLE_NANOTIMING = true
```

## API
### `endTiming = nanotiming(name)`
Start a new timing.

### `endTiming.uuid`
The unique ID created for the timing.

### `endTiming([cb(name)])`
Close the timing. Measuring the timing is done inside a `requestIdleCallback()`
tick, so it might not be available immediately. If a callback is passed it will
be called with the timing's name.

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

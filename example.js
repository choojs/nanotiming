var nanotiming = require('./')
var performance = require('perf_hooks').performance

var nanot = nanotiming('my-loop') // Start profiling

var i = 10
while (--i) console.log(i)

// Stop profiling
nanot()

var timings = performance.getEntries()
var timing = timings[timings.length - 1]
console.log(timing.name, timing.duration) // log the last entry
performance.clearMeasures(timing.name)    // be a good citizen and free after use

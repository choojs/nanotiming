var onIdle = require('on-idle')
var assert = require('assert')

var perf = typeof window !== 'undefined' && window.performance
var hasPerf = perf && perf.mark

module.exports = nanotiming

function nanotiming (name) {
  assert.equal(typeof name, 'string', 'nanotiming: name should be type string')

  if (!hasPerf) return noop

  var uuid = (perf.now() * 100).toFixed()
  var startName = 'start-' + uuid + '-' + name
  perf.mark(startName)

  return function (cb) {
    var endName = 'end-' + uuid + '-' + name
    perf.mark(endName)

    onIdle(function () {
      var measureName = name + ' [' + uuid + ']'
      perf.measure(measureName, startName, endName)
      perf.clearMarks(startName)
      perf.clearMarks(endName)
      if (cb) cb(name)
    })
  }
}

function noop (cb) {
  if (cb) onIdle(cb)
}

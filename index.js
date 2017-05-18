var assert = require('assert')

var hasPerf = typeof window !== 'undefined' &&
  window.performance && window.performance.mark

module.exports = nanotiming

function nanotiming (name) {
  assert.equal(typeof name, 'string', 'nanotiming: name should be type string')

  if (!hasPerf) return noop

  var uuid = (window.performance.now() * 100).toFixed()
  var startName = name + '-start-' + uuid
  window.performance.mark(startName)

  return function () {
    var endName = name + '-end-' + uuid
    window.performance.mark(endName)

    ric(function () {
      var measureName = name + ' [' + uuid + ']'
      window.performance.measure(measureName, startName, endName)
      window.performance.clearMarks(startName)
      window.performance.clearMarks(endName)
    })
  }
}

function ric (cb) {
  if (this.hasIdleCallback) window.requestIdleCallback(cb)
  else setTimeout(cb, 0)
}

function noop () {}

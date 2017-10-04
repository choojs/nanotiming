var assert = require('assert')

var onIdle = require('./lib/on-idle')

var perf
var disabled = true
try {
  perf = window.performance
  disabled = window.localStorage.DISABLE_NANOTIMING === 'true' || !perf.mark
} catch (e) { }

module.exports = nanotiming

function nanotiming (name) {
  assert.equal(typeof name, 'string', 'nanotiming: name should be type string')

  if (disabled) return noop

  var uuid = (perf.now() * 100).toFixed()
  var startName = 'start-' + uuid + '-' + name
  perf.mark(startName)

  function end (cb) {
    var endName = 'end-' + uuid + '-' + name
    perf.mark(endName)

    onIdle(function () {
      perf.measure(name, startName, endName)
      perf.clearMarks(startName)
      perf.clearMarks(endName)
      if (cb) cb(name)
    })
  }

  end.uuid = uuid
  return end
}

function noop (cb) {
  if (cb) onIdle(cb)
}

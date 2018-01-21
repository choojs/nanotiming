var assert = require('assert')

var perf
var disabled = true
try {
  perf = require('perf_hooks').performance
  disabled = process.env.DISABLE_NANOTIMING || !perf.mark
} catch (e) {  }

module.exports = nanotiming

function nanotiming (name) {
  assert.equal(typeof name, 'string', 'nanotiming: name should be type string')

  if (disabled) return cb(new Error('nanotiming: performance API unavailable'))

  var uuid = (perf.now() * 10000).toFixed() % Number.MAX_SAFE_INTEGER
  var startName = 'start-' + uuid + '-' + name
  perf.mark(startName)

  function end (cb) {
    var endName = 'end-' + uuid + '-' + name
    perf.mark(endName)

    var measureName = name + ' [' + uuid + ']'
    perf.measure(measureName, startName, endName)

    perf.clearMarks(startName)
    perf.clearMarks(endName)
  }

  end.uuid = uuid
  return end
}

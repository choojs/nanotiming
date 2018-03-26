var assert = require('assert')

var perf
nanotiming.disabled = true
try {
  perf = require('perf_hooks').performance
  nanotiming.disabled = process.env.DISABLE_NANOTIMING || !perf.mark
} catch (e) { }

module.exports = nanotiming

global._nanotiming_id = 0

function nanotiming (name) {
  if (typeof window !== 'undefined') return require('./browser.js')(name) // electron suport

  assert.equal(typeof name, 'string', 'nanotiming: name should be type string')

  if (nanotiming.disabled) return noop

  var id = (++global._nanotiming_id) % Number.MAX_SAFE_INTEGER
  var startName = 'start-' + id + '-' + name
  perf.mark(startName)

  function end (cb) {
    var endName = 'end-' + id + '-' + name
    perf.mark(endName)

    var err = null
    try {
      var measureName = name + ' [' + id + ']'
      perf.measure(measureName, startName, endName)
      perf.clearMarks(startName)
      perf.clearMarks(endName)
    } catch (e) { err = e }
    if (cb) cb(err, name)
  }

  end.id = id
  return end
}

function noop (cb) {
  if (cb) {
    cb(new Error('nanotiming: performance API unavailable'))
  }
}

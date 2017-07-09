var test = require('tape')
var nanotiming = require('./')

test('nanotiming(name) returns endTiming function', function (t) {
  var endTiming = nanotiming('foo')
  var timings = window.performance.getEntries()
  var timing = timings[timings.length - 1]
  window.performance.clearMeasures(timing.name)
  if (typeof endTiming === 'function') {
    t.pass('is a function')
    endTiming()
  } else {
    t.fail('should be a function, but is ' + typeof endTiming)
  }
  t.end()
})

test('endTiming.uuid is a string', function (t) {
  var endTiming = nanotiming('foo')
  var timings = window.performance.getEntries()
  var timing = timings[timings.length - 1]
  window.performance.clearMeasures(timing.name)
  endTiming()
  t.equal(typeof endTiming.uuid, 'string')
  t.end()
})

test('endTiming callback receives the timing name', function (t) {
  t.plan(1)
  var endTiming = nanotiming('foo')
  var timings = window.performance.getEntries()
  var timing = timings[timings.length - 1]
  window.performance.clearMeasures(timing.name)
  endTiming(name => t.equal(name, 'foo', 'name: ' + name))
})

test.skip('is disabled when no window.performance.mark in environment', function (t) {
  t.plan(1)

  var mark = window.performance.mark
  window.performance.mark = undefined
  // TODO: need a way to run the "disabled" check again

  var noop = nanotiming('foo')
  noop(() => t.fail('called the callback, but should have been a noop'))
  setTimeout(t.pass)

  window.performance.mark = mark
})

test.skip('is disabled when window.localStorage.DISABLE_NANOTIMING === "true"', function (t) {
  t.plan(1)

  window.localStorage.DISABLE_NANOTIMING = true
  // TODO: need a way to run the "disabled" check again

  var noop = nanotiming('foo')
  noop(() => t.fail('called the callback, but should have been a noop'))
  setTimeout(t.pass)

  window.localStorage.removeItem('DISABLE_NANOTIMING')
})

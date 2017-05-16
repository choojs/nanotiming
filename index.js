var assert = require('assert')

module.exports = Nanotiming

function Nanotiming (name) {
  if (!(this instanceof Nanotiming)) return new Nanotiming(name)
  assert.equal(typeof name, 'string', 'Nanotiming: name should be type string')

  this._name = name
  this._enabled = typeof window !== 'undefined' &&
    window.performance && window.performance.mark
}

Nanotiming.prototype.start = function (partial) {
  if (!this._enabled) return
  var name = partial ? this._name + '/' + partial : this._name
  var uuid = createUuid()
  window.performance.mark(name + '-start-' + uuid)
  return uuid
}

Nanotiming.prototype.end = function (uuid, partial) {
  if (!this._enabled) return

  assert.equal(typeof uuid, 'string', 'Nanotiming.end: uuid should be type string')

  var name = partial ? this._name + '/' + partial : this._name
  var endName = name + '-end-' + uuid
  var startName = name + '-start-' + uuid
  window.performance.mark(endName)

  ric(function () {
    name = name + ' [' + uuid + ']'
    window.performance.measure(name, startName, endName)
    window.performance.clearMarks(startName)
    window.performance.clearMarks(endName)
  })
}

function createUuid () {
  return (window.performance.now() * 100).toFixed()
}

function ric (cb) {
  if (this.hasIdleCallback) window.requestIdleCallback(cb)
  else setTimeout(cb, 0)
}

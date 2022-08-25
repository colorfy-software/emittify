class EmittifyMock {
  send = jest.fn()
  listen = jest.fn()
  getCache = jest.fn()
  clear = jest.fn()
  clearAll = jest.fn()
  clearCache = jest.fn()
  clearAllCache = jest.fn()
}

Object.defineProperty(exports, '__esModule', { value: true })

exports.default = EmittifyMock

jest.mock('@colorfy-software/emittify', () => {
  class EmittifyMock {
    send = jest.fn
    listen = jest.fn
    getCache = jest.fn
    clear = jest.fn
    clearAll = jest.fn
    clearCache = jest.fn
    clearAllCache = jest.fn
  }

  return { __esModule: true, default: EmittifyMock }
})

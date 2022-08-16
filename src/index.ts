interface OptionsType<EventsType extends Record<keyof EventsType, EventsType[keyof EventsType]>> {
  cachedEvents?: (keyof EventsType)[]
}

class Emitter<EventsType extends Record<keyof EventsType, EventsType[keyof EventsType]>> {
  /**
   * Map that holds all registered receiver ids per event type. The ids are kept in a Set.
   * This allows to loop over all listeners per event, and send out the message
   *
   * @example { 'messages.incoming': ['0.wfuyeh', '0.kjhsadf8'] }
   */
  private receivers: Map<keyof EventsType, Set<string>> = new Map()
  /**
   * Map of all listeners where key is id of the listener and value is an object with callback, id and event name
   *
   * @example { '0.wfuyeh': { callback: (params) => {}, id: '0.wfuyeh', event: 'messages.incoming' } }
   */
  private listeners = new Map<
    string,
    { id: string; event: keyof EventsType; callback: (params: EventsType[keyof EventsType]) => void }
  >()

  private cachedMessages = new Map<keyof EventsType, EventsType[keyof EventsType]>()

  constructor(private options?: OptionsType<EventsType>) {
    this.options = options || {}
  }

  send = <K extends keyof EventsType>(key: K, params: EventsType[K]) => {
    const receivers = this.receivers.get(key)

    if (receivers) {
      receivers.forEach(receiverId => {
        const listener = this.listeners.get(receiverId)

        if (listener) {
          listener.callback(params)
        }
      })
    }

    if (this.options?.cachedEvents?.includes(key)) {
      this.cachedMessages.set(key, params)
    }
  }

  listen = <K extends keyof EventsType>(
    key: K,
    callback: (params: EventsType[K]) => void,
  ): {
    id: string
    event: K
    clearListener: () => void
  } => {
    const id = Math.random().toString(16)
    const receivers = this.receivers.get(key)

    if (this.options?.cachedEvents?.includes(key) && this.cachedMessages.has(key)) {
      const values = this.cachedMessages.get(key) as EventsType[K]

      if (values) {
        callback(values)
      }
    }

    if (receivers) {
      receivers.add(id)
    } else {
      this.receivers.set(key, new Set<string>().add(id))
    }

    this.listeners.set(id, {
      id,
      event: key,
      callback: callback as (params: EventsType[keyof EventsType]) => void,
    })

    return {
      id,
      event: key,
      clearListener: () => this.clear(id),
    }
  }

  getCache = <K extends keyof EventsType, V extends EventsType[K]>(
    key: K,
    fallbackValue?: V,
  ): V extends undefined ? EventsType[K] : V => {
    const value = this.cachedMessages.get(key)

    if (value) {
      return value
    }

    return fallbackValue as EventsType[K]
  }

  clear = (id: string) => {
    const listener = this.listeners.get(id)

    if (listener) {
      const receivers = this.receivers.get(listener.event)

      if (receivers) {
        receivers.delete(id)
        this.listeners.delete(id)
      }
    }

    return listener as undefined
  }

  clearAll = () => {
    this.receivers = new Map()
    this.listeners = new Map()

    return this.listeners
  }

  clearCache = <K extends keyof EventsType>(key: K) => {
    this.cachedMessages.delete(key)
  }

  clearAllCache = () => {
    this.cachedMessages = new Map()
  }
}

export default Emitter

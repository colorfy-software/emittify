<!-- This is a read me for a tiny event emitter written in typescript. It supports caching and has hooks for react and solidjs -->

# Emittify - A tiny event emitter

This is a tiny event emitter written with first class typescript support.

It supports caching and has hooks for react and solidjs.
<br/><br/>

## Installation

<br/>

```bash
yarn add @colorfy-software/emittify
```

<br/><br/>

## Getting Started

<br/><br/>

### Creating an Emitter with types

<br/>

```typescript
// events-core.ts

// import the emittify module
import Emittify from '@colorfy-software/emittify'
// importing toast notification component props type to use in the emittify module
import type { ToastNotificationPropsType } from '@components/ToastNotification'

// Type for the emitter
// key is the name of the event and value is the type of the event
interface EventsType {
  'direct-message-count': number
  'toast-notification': ToastNotificationPropsType
}

const emitter = new Emittify<EventsType>({
  // Cache is used to cache the events and prevent emitting the same event multiple times
  cachedEvents: ['direct-message-count'],
})

export default emitter
```

<br/>

### Sending and listening to events

<br/>

```typescript
// File where you want to use it
import emitter from './events-core'


// register a listener for the 'toast-notification' event
emitter.listen('toast-notification', data => {
  const { message, type } = data // All is typed and auto-completed

  console.log({ message, type })
}

// emit the 'toast-notification' event
// All is typed and auto-completed
emitter.send('toast-notification', {
  message: 'Hello World',
  type: 'success'
}


// emit the 'direct-message-count' event
emitter.send('direct-message-count', 10)

// get the cached event
const cachedEvent = emitter.getCache('direct-message-count', 0) // Can provide second argument as default value if none is sent yet
```

<br/>

### Hooks

<br/>
<br/>

### For react:

```typescript
import Emittify from '@colorfy-software/emittify/react'
```

<br/>

### For solidjs:

```typescript
import Emittify from '@colorfy-software/emittify/solidjs'
```

<br/>

### Usage

<br/>

```tsx
// import previously created emitter
import emitter from '../core/events-core.ts'

const Component = () => {
  // Can provide second argument as default value if none is sent yet. Will as well return cached value as initial value if an event was previously sent and cached
  const count = emitter.useEventListener('direct-message-count', 0)

  return <button onClick={() => emitter.send('direct-message-count', 100)}>{count}</button>
}
```

<br/>

## All Methods on Emittify class

<br/>

<!-- send -> emittify.send('event-name', value) -> Sends an event with specified name and value -->
<!-- listen -> emittify.listen('event-name', callback) -> Listens to events with specified name and triggers a callback on each event-->
<!-- useEventListener -> emittify.useEventListener('event-name', initialValue) -> Emits an event with specified name and value. Returns cached value if one exists, otherwise returns initial value if that is provided -->
<!-- getCache -> emittify.getCache('event-name', initialValue) -> Gets the cached value for event name -->
<!-- clearCache -> emittify.clearCache('event-name') -> Clears cache for given event name -->
<!-- clearAllCache -> emittify.clearAllCache() -> Clears all of the cache -->
<!-- clear -> emittify.clear('event-name') -> Clears listeners for given event name -->

## send

<br/>

```typescript
// send an event with specified name and value
emittify.send('event-name', value)
```

<br/>

## listen

<br/>

```typescript
// listen to events with specified name and triggers a callback on each event
const listener = emittify.listen('event-name', callback)

// Listener is an object
listener.id // Unique id for the listener
listener.event // Name of the event
listener.clearListener() // Clears the listener
```

<br/>

## useEventListener

<br/>

```typescript
// emits an event with specified name and value. Returns cached value if one exists, otherwise returns initial value if that is provided
emittify.useEventListener('event-name', initialValue)
```

<br/>

## getCache

<br/>

```typescript
// gets the cached value for event name
emittify.getCache('event-name', initialValue)
```

<br/>

## clearCache

<br/>

```typescript
// clears cache for given event name
emittify.clearCache('event-name')
```

<br/>

## clearAllCache

<br/>

```typescript
// clears all of the cache
emittify.clearAllCache()
```

<br/>

### clear

<br/>

```typescript
// clears listeners for given listener id
emittify.clear('listener-id')
```

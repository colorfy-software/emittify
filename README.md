# Emittify - a tiny event emitter

This is a tiny event emitter written with first class Typescript support.
It supports caching and has hooks for both React and Solid.

## Installation

```bash
yarn add @colorfy-software/emittify
```

## Getting started

### Creating an Emitter with types

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

### Sending and listening to events

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

### Testing with Jest

If you don't already have a Jest setup file configured, please add the following to your [Jest configuration file](https://jestjs.io/docs/configuration) and create the new `jest.setup.js` file in project root:

```js
setupFiles: ['<rootDir>/jest.setup.js'];
```

You can then add the following line to that setup file to mock the `NativeModule.RNPermissions`:

```js
jest.mock('@colorfy-software/emittify', () => require('@colorfy-software/emittify/mock'));
```

## Hooks

### For React:

```typescript
import Emittify from '@colorfy-software/emittify/react'
```

### For Solid:

```typescript
import Emittify from '@colorfy-software/emittify/solid'
```

## Usage

```tsx
// import previously created emitter
import emitter from '../core/events-core.ts'

const Component = () => {
  // Can provide second argument as default value if none is sent yet. Will as well return cached value as initial value if an event was previously sent and cached
  const count = emitter.useEventListener('direct-message-count', 0)

  return <button onClick={() => emitter.send('direct-message-count', 100)}>{count}</button>
}
```

## All Methods on Emittify class

### send

```typescript
// send an event with specified name and value
emittify.send('event-name', value)
```

### listen

```typescript
// listen to events with specified name and triggers a callback on each event
const listener = emittify.listen('event-name', callback)

// Listener is an object
listener.id // Unique id for the listener
listener.event // Name of the event
listener.clearListener() // Clears the listener
```

### useEventListener

```typescript
// emits an event with specified name and value. Returns cached value if one exists, otherwise returns initial value if that is provided
emittify.useEventListener('event-name', initialValue)
``

### getCache

```typescript
// gets the cached value for event name
emittify.getCache('event-name', initialValue)
```

### clearCache

```typescript
// clears cache for given event name
emittify.clearCache('event-name')
```

### clearAllCache

```typescript
// clears all of the cache
emittify.clearAllCache()
```

### clear

```typescript
// clears listeners for given listener id
emittify.clear('listener-id')
```

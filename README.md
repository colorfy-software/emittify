<h1 align="center">
  <a href="https://github.com/colorfy-software/emittify/" target="_blank" rel="noopener noreferrer">
    🛩 Emittify
  </a>
</h1>

<h4 align="center">
  <strong>A tiny event emitter.</strong>
</h4>

<p align="center">
  <a href="https://www.npmjs.org/package/@colorfy-software/emittify">
    <img src="https://badge.fury.io/js/@colorfy-software%2Femittify.svg" alt="Current npm package version." />
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
</p>

## 🎯 Purpose

Emittify is a tiny event emitter written with first class Typescript support.
It supports caching and has hooks for both React and Solid.

## 🏗️ Installation

```sh
yarn add @colorfy-software/emittify
```

## 💻 Usage

### 🆕 Creating an Emitter with types

```ts
// events-core.ts

// Import the emittify module.
import Emittify from '@colorfy-software/emittify'
// Importing toast notification component props type to use in the emittify module.
import type { ToastNotificationPropsType } from '@components/ToastNotification'

// Type for the emitter key is the name of the event and value is the type of the event.
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

### 📧 Sending and listening to events

```ts
// File where you want to use it
import emitter from './events-core'

// Register a listener for the 'toast-notification' event.
emitter.listen('toast-notification', data => {
  const { message, type } = data // All is typed and auto-completed

  console.log({ message, type })
}

// Emit the 'toast-notification' event.
// All is typed and auto-completed.
emitter.send('toast-notification', {
  message: 'Hello World',
  type: 'success'
}

// Emit the 'direct-message-count' event.
emitter.send('direct-message-count', 10)

// Get the cached event.
const cachedEvent = emitter.getCache('direct-message-count', 0) // Can provide second argument as default value if none is sent yet.
```

### 🧪 Testing with Jest

If you don't already have a Jest setup file configured, please add the following to your [Jest configuration file](https://jestjs.io/docs/configuration) and create the new `jest.setup.js` file in project root:

```js
setupFiles: ['<rootDir>/jest.setup.js'];
```

You can then add the following line to that setup file to mock the `NativeModule.RNPermissions`:

```js
jest.mock('@colorfy-software/emittify', () => require('@colorfy-software/emittify/mock'));
```

### 🪝 Hooks

#### React

```ts
import Emittify from '@colorfy-software/emittify/react'
```

#### Solid

```ts
import Emittify from '@colorfy-software/emittify/solid'
```

#### Usage

```tsx
// import previously created emitter
import emitter from '../core/events-core.ts'

const Component = () => {
  // Can provide second argument as default value if none is sent yet. Will as well return cached value as initial value if an event was previously sent and cached
  const count = emitter.useEventListener('direct-message-count', 0)

  return <button onClick={() => emitter.send('direct-message-count', 100)}>{count}</button>
}
```

### 🗂 Methods

#### `send()`

```ts
// Send an event with specified name and value.
emittify.send('event-name', value)
```

#### `listen()`

```ts
// Listen to events with specified name and triggers a callback on each event.
const listener = emittify.listen('event-name', callback)

// Listener is an object.
listener.id // Unique id for the listener
listener.event // Name of the event
listener.clearListener() // Clears the listener
```

#### `useEventListener()`

```ts
// Emits an event with specified name and value. Returns cached value if one exists, otherwise returns initial value if that is provided.
emittify.useEventListener('event-name', initialValue)
```

#### `getCache()`

```ts
// Gets the cached value for event name.
emittify.getCache('event-name', initialValue)
```

#### `clearCache()`

```ts
// Clears cache for given event name.
emittify.clearCache('event-name')
```

#### `clearAllCache()`

```ts
// Clears all of the cache.
emittify.clearAllCache()
```

#### `clear()`

```ts
// Clears listeners for given listener id.
emittify.clear('listener-id')
```

## 💖 Code of Conduct

This library has adopted a Code of Conduct that we expect project participants to adhere to. Please read the [full text](https://github.com/colorfy-software/localify/blob/master/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## 📰 License

localify is licensed under the [MIT License](https://github.com/colorfy-software/localify/blob/master/LICENSE).

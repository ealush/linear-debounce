# LINEAR

[![Greenkeeper badge](https://badges.greenkeeper.io/patuach/linear.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/patuach/linear.svg?branch=master)](https://travis-ci.org/patuach/linear) [![npm version](https://badge.fury.io/js/linear-debounce.svg)](https://badge.fury.io/js/linear-debounce)

```npm install linear-debounce```

Multiple debounce actions sequencer

Linear allows debouncing more than one function at a time, making it simple to respond to one event with multiple functions, or at different times:

```js
window.addEventListener('scroll', linear({
    '0': () => console.log('this will happen immediately'),
    '2500': () => console.log('this will happen after 2.5 seconds'),
    '5000': () => console.log('this will happen after 5 seconds'),
}));
```

It is also possible to pass multiple functions to fire on the same delay using an array of functions:

```js
window.addEventListener('scroll', linear({
    '2500': [
        () => console.log('this will happen after 2.5 seconds'),
        () => console.log('this will happen after 2.5 seconds'),
        () => console.log('this will happen after 2.5 seconds')
    ]
}));
```

Sometimes you would want to cancel the already initiated events from being fired, for example, when your app's state changes and you do not expect the debounced actions anymore. To cancel the events, simply call `cancel`:

```js
 const isTypingDebouncer = linear({
    '0': () => this.setState({userTyping: true}),
    '3000': () => this.setState({userTyping: false})
});

isTypingDebouncer(); // initiates the debounced actions

isTypingDebouncer.cancel(); // clears existing timeouts, in our case, only `0` will fire.
```

Note: Calling `cancel` will not prevent future timeouts from being created. It only clears the ones that have already initiated. Calling `isTypingDebouncer` again, for example, will re-start the count.
# LINEAR

Multiple debounce actions sequencer

Linear allows debouncing more than one function at a time, making it simple to respond to one event with multiple functions, or at different times:

```js
window.addEventListener('scroll', linear({
    '0': () => console.log('this will happen immediately'),
    '2500': () => console.log('this will happen after 2.5 seconds'),
    '5000': () => console.log('this will happen after 5 seconds'),
}))
```
const linear = require('linear-debounce');

console.log('linear playground, lets play!');

const debouncer = linear({
    '0': () => console.log('Immediate'),
    '100': () => console.log('100'),
    '1000': () => console.log('1000'),
    '2000': () => console.log('2000')
});

debouncer();
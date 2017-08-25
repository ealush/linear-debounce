/* eslint flowtype/require-valid-file-annotation: 0 */
/* eslint flowtype/require-variable-type: 0 */

const {expect, assert} = require('chai');
const linear = require('./');

describe('linear', () => {
    it('calls 0 timeout immediately', () => {
        linear({
            '0': () => assert(true)
        })();
    });

    it('calls all the things', (done) => {
        const callbacks = {
            '20': imdone,
            '10': [imdone, 'noFire'],
            '22': imdone,
            '1.4': 'noFire',
            '30': [imdone, imdone, imdone, imdone, 'noFire']
        };

        let counter = 7;

        function imdone() {
            counter--;
            if (!counter) {
                done();
            }
        }

        linear(callbacks)();
    });

    it('callback is bound to caller', (done) => {
        class Context {
            constructor(name) {
                this.name = name;
            }
        }

        let counter = 2;

        function imdone() {
            counter--;
            if (!counter) {
                done();
            }
        }

        Context.prototype = {
            checkContext: linear({
                '10': function() {
                    expect(this.name).to.equal('Martin');
                    imdone();
                },
                '15': [function() {
                    expect(this.name).to.equal('Martin');
                    imdone();
                }]
            })
        };

        const context = new Context('Martin');

        context.checkContext();
    });

    it('passes through function arguments', (done) => {
        const _arguments = [1, 2, 3, 'f'];
        let counter = 2;

        function imdone() {
            counter--;
            if (!counter) {
                done();
            }
        };

        const myLinear = linear({
            '10': [function(...args) {
                expect(args).to.deep.equal(_arguments);
                imdone();
            }],
            '30': function(...args) {
                expect(args).to.deep.equal(_arguments);
                imdone();
            }
        });

        myLinear(_arguments);
    });

    it('stops execution after using the cancel function', () => {

        let counter = 5;

        function decrement() { counter--; }

        const debouncer = linear({
            '0': decrement,
            '100': decrement,
            '150': decrement,
            '200': decrement,
            '202': decrement
        });

        linear({
            '0': debouncer,
            '100': [debouncer.cancel, () => expect(counter).to.equal(3)]
        })();
    }).timeout(300);

});

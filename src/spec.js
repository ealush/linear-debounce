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
            '10': imdone,
            '40': imdone,
            '1.4': imdone
        };

        let counter = Object.keys(callbacks).length;

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
        Context.prototype = {
            checkContext: linear({
                '10': function() {
                    expect(this.name).to.equal('Martin');
                    done();
                }
            })
        }

        const context = new Context('Martin');

        context.checkContext();
    });

    it('passes through function arguments', (done) => {
        const _arguments = [1, 2, 3, 'f'];

        const myLinear = linear({
            '10': function(...args) {
                expect(args).to.deep.equal(_arguments);
                done();
            }
        });

        myLinear(_arguments);
    });

})


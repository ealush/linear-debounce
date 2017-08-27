// @flow

type DelayedFunction = Function | Array<Function>;

type Wait = {
    [milliseconds: string]: DelayedFunction
};

type Timeouts = {
    [delay: string]: number
};

function linear(wait: Wait): Function {
    const timeouts: Timeouts = {},
        delays: Array<string> = Object.keys(wait);

    function cancel(): void {
        Object.values(timeouts).forEach(clearTimeout);
    }

    function debouncer(...args: Array<mixed>): void {
        delays.forEach((delay) => {
            clearTimeout(timeouts[delay]);

            const current: DelayedFunction = wait[delay];

            if (typeof current !== 'function' && !Array.isArray(current)) {
                return;
            }

            const int: number = parseInt(delay, 10);

            if (!int) {

                if (Array.isArray(current)) {
                    for (let i: number = 0; i < current.length; i++) {
                        typeof current[i] === 'function' && current[i].apply(this, ...args);
                    }
                    return;
                }
                return current.apply(this, ...args);
            }

            timeouts[delay] = setTimeout(() => {
                if (!Array.isArray(current)) { current.apply(this, ...args); }
                for (let i: number = 0; i < current.length; i++) {
                    typeof current[i] === 'function' && current[i].apply(this, ...args);
                }
            }, int);
        });
    };

    debouncer.cancel = cancel;
    return debouncer;
}

export default linear;
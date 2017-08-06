// @flow

type Wait = {
    [milliseconds: string]: Function
};

type Timeouts = {
    [delay: string]: number
};

function linear(wait: Wait): Function {
    const timeouts: Timeouts = {},
        delays: Array<string> = Object.keys(wait);

    return function(...args): void {
        delays.forEach((delay) => {
            clearTimeout(timeouts[delay]);

            if (typeof wait[delay] !== 'function') {
                return;
            }

            const int: number = parseInt(delay, 10);

            if (!int) {
                return wait[delay].apply(this, ...args);
            }

            timeouts[delay] = setTimeout(() => wait[delay].apply(this, ...args), int);
        });
    };
}

export default linear;
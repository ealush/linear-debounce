// @flow

type Wait = {
    [milliseconds: string]: Function
};

function linear(wait: Wait): Function {
    const timeouts = {},
        delays = Object.keys(wait);

    return (): void => {
        const args = arguments,
            context = this;

        delays.forEach((delay) => {
            clearTimeout(timeouts[delay]);

            if (typeof wait[delay] !== 'function') {
                return;
            }

            const int = parseInt(delay, 10);

            if (!int) {
                return wait[delay].apply(context, args);
            }

            timeouts[delay] = setTimeout(() => wait[delay].apply(context, args), int);
        });
    }
}

export default linear;
export const fromEntries = <T>(items: [string, T][]): Record<string, T> =>
    items.reduce((carry, [ key, value ]) => {
        carry[key] = value;
        return carry;
    }, {});

export const fromEntries = (items: [string, string][]): Record<string, string> =>
    items.reduce((carry, [key, value]) => {
        carry[key] = value;
        return carry;
    }, {});

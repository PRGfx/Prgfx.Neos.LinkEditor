let id = 0;

export const useId = (): string => {
    return `prgfx-le-id${++id}`;
};

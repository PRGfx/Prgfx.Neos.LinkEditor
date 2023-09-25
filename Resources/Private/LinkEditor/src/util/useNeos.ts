import { useContext } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { NeosContext } from '@neos-project/neos-ui-decorators';

type Registry = {
    get<T = Registry>(key: string): T;
}

type NeosResponse = {
    globalRegistry: Registry;
}

export const useNeos = (): NeosResponse => {
    return useContext(NeosContext);
};

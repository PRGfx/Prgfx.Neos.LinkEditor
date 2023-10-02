import React from 'react';
import { GlobalNeos } from '../util/useNeos';
import { fromEntries } from '../util/objects';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { LinkInput } from '@neos-project/neos-ui-editors';

type LinkEditorProps = {
    value?: string;
    commit: (newValue: string) => void;
    options?: {
        [key: string]: unknown,
        linking?: Record<string, unknown>,
    };
    neos: GlobalNeos;
}

/**
 * Custom wrapper around the LinkEditor to support linking options in the inspector
 * @param props
 * @constructor
 */
export const LinkEditor: React.FunctionComponent<LinkEditorProps> = props => {
    const { linking, ...options } = props.options;

    const editorConfiguration = props.neos.globalRegistry
        .get('frontendConfiguration')
        .get<{linkEditor?: { ignoredOptions: string[] }}>('Prgfx.Neos.LinkEditor');
    const ignoredOptions = editorConfiguration.linkEditor?.ignoredOptions ?? [];

    const linkingOptions = {
        ...linking,
        ...fromEntries(ignoredOptions.map(option => [ option, false ])),
    };

    return (
        <LinkInput
            linkValue={props.value}
            onLinkChange={props.commit}
            options={options}
            linkingOptions={linkingOptions}
        />
    );
};

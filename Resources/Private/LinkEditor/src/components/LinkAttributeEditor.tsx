import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    AttributeOption,
    getAttributeGroups,
    getAttributeOptions,
    groupOptions,
} from '../util/attributeOptions';
import { fromEntries } from '../util/objects';
import { LinkAttributeGroup } from './LinkAttributeGroup';
import { useNeos } from '../util/useNeos';

type LinkAttributeEditorProps = {
    linkValue: string;
    onLinkChange: (value: string) => void;
    linkingOptions: Record<string, unknown>;
    i18nRegistry: {translate: (key: string) => string};
}

export const LinkAttributeEditor: React.FunctionComponent<LinkAttributeEditorProps> = props => {
    const { onLinkChange } = props;
    const { globalRegistry } = useNeos();

    const availableGroups = useMemo(() => {
        const options = globalRegistry.get('frontendConfiguration').get<{groups: unknown}>('Prgfx.Neos.LinkEditor');
        return getAttributeGroups(options.groups);
    }, [ globalRegistry ]);

    const [ attributeValues, setAttributeValues ] = useState<Record<string, string>>({});

    const options: AttributeOption[] = useMemo(() => {
        return getAttributeOptions(props.linkingOptions);
    }, [ props.linkingOptions ]);

    const groupedOptions = useMemo(() => {
        return groupOptions(options).filter(([ key ]) => key in availableGroups);
    }, [ options, availableGroups ]);

    useEffect(() => {
        try {
            const linkUrl = new URL(props.linkValue);
            if (linkUrl.search) {
                linkUrl.searchParams;
                setAttributeValues(fromEntries(options.map(item => [
                    item.attribute,
                    linkUrl.searchParams.get(item.attribute) ?? '',
                ])));
            }
        } catch (e) {
            setAttributeValues(fromEntries(options.map(item => [ item.attribute, '' ])));
        }
    }, [ props.linkValue, options ]);

    const handleUpdate = useCallback((property: string) => (newValue: string) => {
        setAttributeValues(current => {
            const next = { ...current, [property]: newValue };
            try {
                const linkUrl = new URL(props.linkValue);
                const searchParams = linkUrl.searchParams;
                if (newValue.length === 0 && searchParams.has(property)) {
                    searchParams.delete(property);
                } else {
                    searchParams.set(property, newValue);
                }
                onLinkChange(linkUrl.toString());
            } catch (e) { /* empty */ }
            return next;
        });
    }, [ props.linkValue, onLinkChange ]);

    return (
        <>
            {groupedOptions.map(([ group, options ]) => (
                <LinkAttributeGroup
                    key={group}
                    label={availableGroups[group].label}
                    i18nRegistry={props.i18nRegistry}
                    options={options}
                    onChange={handleUpdate}
                    values={attributeValues}
                />
            ))}
        </>
    );
};

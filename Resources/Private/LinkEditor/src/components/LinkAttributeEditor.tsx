import React, {CSSProperties, useCallback, useEffect, useMemo, useState} from 'react';
import {TextInput} from '@neos-project/react-ui-components';
import {AttributeOption, getAttributeOptions} from '../util/attributeOptions';
import {LinkAttributeLabel} from './LinkAttributeLabel';
import {fromEntries} from '../util/objects';

type LinkAttributeEditorProps = {
    linkValue: string;
    onLinkChange: (value: string) => void;
    linkingOptions: Record<string, unknown>;
    i18nRegistry: {translate: (key: string) => string};
}

const containerStyles: CSSProperties = {
    display: 'flex',
    padding: 8,
    gap: 8,
    flexWrap: 'wrap',
}

export const LinkAttributeEditor: React.FunctionComponent<LinkAttributeEditorProps> = props => {
    const [attributeValues, setAttributeValues] = useState<Record<string, string>>({});

    const options: AttributeOption[] = useMemo(() => {
        return getAttributeOptions(props.linkingOptions);
    }, [props.linkingOptions]);

    useEffect(() => {
        try {
            const linkUrl = new URL(props.linkValue);
            if (linkUrl.search) {
                linkUrl.searchParams
                setAttributeValues(fromEntries(options.map(item => [
                    item.attribute,
                    linkUrl.searchParams.get(item.attribute) ?? '',
                ])));
            }
        } catch (e) {
            setAttributeValues(fromEntries(options.map(item => [item.attribute, ''])));
        }
    }, [props.linkValue, options]);
    /*const attributeValues = useMemo(() => {
        try {
            const linkUrl = new URL(props.linkValue);
            if (linkUrl.search) {
                linkUrl.searchParams
                return fromEntries(options.map(item => [
                    item.attribute,
                    linkUrl.searchParams.get(item.attribute) ?? '',
                ]));
            }
        } catch (e) {
        }
        return fromEntries(options.map(item => [item.attribute, '']));
    }, [props.linkValue, options]);*/

    const handleUpdate = useCallback((property: string) => (newValue: string) => {
        setAttributeValues(current => {
            const next = {...current, [property]: newValue};
            try {
                const linkUrl = new URL(props.linkValue);
                const searchParams = linkUrl.searchParams;
                if (newValue.length === 0 && searchParams.has(property)) {
                    searchParams.delete(property);
                } else {
                    searchParams.set(property, newValue);
                }
                props.onLinkChange(linkUrl.toString());
            } catch (e) {
            }
            return next;
        })
    }, [props.linkValue, props.onLinkChange]);
    /*const handleUpdate = (property: string) => (newValue: string) => {
        const linkUrl = new URL(props.linkValue);
        const searchParams = linkUrl.searchParams;
        if (newValue.length === 0 && searchParams.has(property)) {
            searchParams.delete(property);
        } else {
            searchParams.set(property, newValue);
        }
        props.onLinkChange(linkUrl.toString());
    };*/

    return (
        <div style={containerStyles}>
            {options.map((option, i) => {
                const inputId = `link-attribute-input-${i}`
                return (
                    <div key={option.attribute}>
                        <LinkAttributeLabel
                            option={option}
                            inputId={inputId}
                            i18nRegistry={props.i18nRegistry}
                        />
                        <TextInput
                            id={inputId}
                            value={attributeValues[option.attribute]}
                            onChange={handleUpdate(option.attribute)}
                            placeholder={props.i18nRegistry.translate(option.placeholder)}
                        />
                    </div>
                );
            })}
        </div>
    )
}

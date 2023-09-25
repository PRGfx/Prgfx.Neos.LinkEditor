import React, { useEffect, useRef, useState } from 'react';
import { AttributeOption } from '../util/attributeOptions';
import { LinkAttributeLabel } from './LinkAttributeLabel';
import { IconButton, TextInput } from '@neos-project/react-ui-components';
import { useId } from '../util/useId';

type LinkAttributeGroupProps = {
    label: string;
    i18nRegistry: {translate: (key: string) => string};
    options: AttributeOption[];
    onChange: (property: string) => (newValue: string) => void;
    values: Record<string, string>;
    collapsed: boolean|undefined;
}

const fieldsetStyles: React.CSSProperties = {
    padding: 8,
    border: 0,
    margin: 0,
    position: 'relative',
    width: '100%',
};
const legendStyles: React.CSSProperties = {
    display: 'block',
    top: 8,
    marginBottom: 8,
    position:'relative',
};
const toggleButtonStyles: React.CSSProperties = {
    position: 'absolute',
    top: '-3ch',
    right: 0,
};
const containerStyles = (collapsed: boolean): React.CSSProperties => ({
    display: collapsed ? 'none' : 'flex',
    flexWrap: 'wrap',
    gap: 8,
});

const isCollapsed = (props: LinkAttributeGroupProps): boolean =>
    props.collapsed === true && props.options.every(({ attribute }) => {
        return !(attribute in props.values) || props.values[attribute] === '';
    });

export const LinkAttributeGroup: React.FunctionComponent<LinkAttributeGroupProps> = props => {
    const [ collapsed, setCollapsed ] = useState(isCollapsed(props));
    const initialized = useRef(false);
    const labelId = useId();
    const groupId = useId();

    useEffect(() => {
        // we might not have the current link parsed and the values may not be processed yet.
        // we want to make sure to initialize to collapsed state accordingly.
        if (initialized.current) {
            return;
        }
        if (Object.keys(props.values).length > 0) {
            setCollapsed(isCollapsed(props));
            initialized.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ props.values ]);

    return (
        <fieldset style={fieldsetStyles}>
            <legend style={legendStyles} id={labelId}>{props.i18nRegistry.translate(props.label)}</legend>
            <div style={toggleButtonStyles}>
                <IconButton
                    icon={collapsed ? 'chevron-circle-down' : 'chevron-circle-up'}
                    onClick={() => setCollapsed(v => !v)}
                    style="transparent"
                    size="small"
                    aria-expanded={!collapsed}
                    aria-controls={groupId}
                    aria-labelledby={labelId}
                />
            </div>
            <div style={containerStyles(collapsed)} id={groupId}>
                {props.options.map((option, i) => {
                    const inputId = `link-attribute-input-${i}`;
                    return (
                        <div key={option.attribute}>
                            <LinkAttributeLabel
                                option={option}
                                inputId={inputId}
                                i18nRegistry={props.i18nRegistry}
                            />
                            <TextInput
                                id={inputId}
                                value={props.values[option.attribute]}
                                onChange={props.onChange(option.attribute)}
                                placeholder={props.i18nRegistry.translate(option.placeholder)}
                            />
                        </div>
                    );
                })}
            </div>
        </fieldset>
    );
};

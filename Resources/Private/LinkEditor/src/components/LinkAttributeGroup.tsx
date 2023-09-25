import React from 'react';
import { AttributeOption } from '../util/attributeOptions';
import { LinkAttributeLabel } from './LinkAttributeLabel';
import { TextInput } from '@neos-project/react-ui-components';

type LinkAttributeGroupProps = {
    label: string;
    i18nRegistry: {translate: (key: string) => string};
    options: AttributeOption[];
    onChange: (property: string) => (newValue: string) => void;
    values: Record<string, string>;
}

const fieldsetStyles: React.CSSProperties = {
    padding: 8,
    border: 0,
    margin: 0,
};
const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
};

export const LinkAttributeGroup: React.FunctionComponent<LinkAttributeGroupProps> = props => {
    return (
        <fieldset style={fieldsetStyles}>
            <legend>{props.i18nRegistry.translate(props.label)}</legend>
            <div style={containerStyles}>
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

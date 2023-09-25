import React, { useState } from 'react';
import { Icon, Label, Tooltip } from '@neos-project/react-ui-components';
import { AttributeOption } from '../util/attributeOptions';

type LinkAttributeLabelProps = {
    option: AttributeOption;
    inputId: string;
    i18nRegistry: {translate: (key: string) => string};
}
export const LinkAttributeLabel: React.FunctionComponent<LinkAttributeLabelProps> = ({ inputId, option, i18nRegistry }) => {
    const [ helpOpen, setHelpOpen ] = useState(false);
    const toggleHelpMessage = () => setHelpOpen(current => !current);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Label htmlFor={inputId}>{i18nRegistry.translate(option.label)}</Label>
                {option.help && (
                    <span role="button" onClick={toggleHelpMessage}>
                        <Icon icon="question-circle"/>
                    </span>
                )}
            </div>
            {option.help && helpOpen && (
                <Tooltip renderInline>
                    {i18nRegistry.translate(option.help)}
                </Tooltip>
            )}
        </div>
    );
};

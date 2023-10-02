import React, { useState } from 'react';
import { Icon, Label, Tooltip } from '@neos-project/react-ui-components';
import { AttributeOption } from '../util/attributeOptions';

type LinkAttributeLabelProps = {
    option: AttributeOption;
    inputId: string;
    i18nRegistry: {translate: (key: string) => string};
}

const styles = {
    wrapper: {
        position: 'relative',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    tooltipWrapper: {
        position: 'relative',
        zIndex: 10,
    },
    infoButton: {
        cursor: 'pointer',
    },
} satisfies Record<string, React.CSSProperties>;

export const LinkAttributeLabel: React.FunctionComponent<LinkAttributeLabelProps> = ({ inputId, option, i18nRegistry }) => {
    const [ helpOpen, setHelpOpen ] = useState(false);
    const toggleHelpMessage = () => setHelpOpen(current => !current);

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <Label htmlFor={inputId}>{i18nRegistry.translate(option.label)}</Label>
                {option.help && (
                    <span role="button" onClick={toggleHelpMessage} style={styles.infoButton}>
                        <Icon icon="question-circle"/>
                    </span>
                )}
            </div>
            {option.help && helpOpen && (
                <div style={styles.tooltipWrapper}>
                    <Tooltip>
                        {i18nRegistry.translate(option.help)}
                    </Tooltip>
                </div>
            )}
        </div>
    );
};

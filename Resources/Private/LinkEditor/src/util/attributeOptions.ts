export type AttributeOption = {
    attribute: string;
    label: string;
    group: string;
    help?: string;
    placeholder?: string;
}

export type AttributeGroup = {
    key: string;
    label: string;
}

export const getAttributeGroups = (options: unknown): Record<string, AttributeGroup> => {
    const result: Record<string, AttributeGroup> = {};

    if (!options || typeof options !== 'object' || Array.isArray(options)) {
        return result;
    }

    Object.entries(options).forEach(([ key, value ]) => {
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            return;
        }

        if (!('label' in value) || typeof value.label !== 'string') {
            return;
        }

        result[key] = {
            key,
            label: value.label,
        };
    });

    return result;
};

export const DefaultAttributeGroup = 'default';

export const getAttributeOptions = (options: Record<string, unknown>): AttributeOption[] => {
    if (!('linkAttributes' in options) || !options.linkAttributes || typeof options.linkAttributes !== 'object' || Array.isArray(options.linkAttributes)) {
        return [];
    }

    const result: AttributeOption[] = [];

    Object.keys(options.linkAttributes).forEach(attribute => {
        const config = options.linkAttributes[attribute];

        if (!config) {
            return;
        }

        if (typeof config === 'string') {
            return result.push({
                attribute,
                label: config,
                group: DefaultAttributeGroup,
            });
        }

        if (typeof config !== 'object' || Array.isArray(config)) {
            return;
        }

        if (!('label' in config && typeof config.label === 'string')) {
            return;
        }

        const help = 'help' in config && typeof config.help === 'string'
            ? config.help
            : undefined;

        const placeholder = 'placeholder' in config && typeof config.placeholder === 'string'
            ? config.placeholder
            : undefined;

        const group = 'group' in config && typeof config.group === 'string'
            ? config.group
            : DefaultAttributeGroup;

        return result.push({
            attribute,
            label: config.label,
            help,
            placeholder,
            group,
        });
    });

    return result;
};

export const groupOptions = (options: AttributeOption[]): [group: string, options: AttributeOption[]][] => {
    const byGroups = options.reduce<Record<string, AttributeOption[]>>((byGroups, option) => ({
        ...byGroups,
        [option.group]: [ ...(byGroups[option.group] ?? []), option ],
    }), {});
    return Object.entries(byGroups);
};

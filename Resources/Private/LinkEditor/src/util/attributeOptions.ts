export type AttributeOption = {
    attribute: string;
    label: string;
    help?: string;
    placeholder?: string;
}
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

        return result.push({
            attribute,
            label: config.label,
            help,
            placeholder,
        });
    });

    return result;
}

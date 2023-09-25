import manifest from '@neos-project/neos-ui-extensibility';
import { LinkAttributeEditor } from './components/LinkAttributeEditor';

manifest('Prgfx.Neos.LinkEditor:LinkEditor', {}, (globalRegistry) => {
    const containerRegistry = globalRegistry.get('containers');

    containerRegistry.set(
        'LinkInput/OptionsPanel/LinkAttributeEditor',
        LinkAttributeEditor,
        'end'
    );

    // we generate links with query arguments, but we want to ignore these arguments when looking up the node, so it
    // will still be displayed in the link editor
    const linkLookupDataLoader = globalRegistry.get('dataLoaders').get('LinkLookup');
    const originalResolve: (options: unknown, identifier: string) => unknown = linkLookupDataLoader.resolveValue;
    const newResolve: typeof originalResolve = (options, oldLookup) => {
        const newLookup = typeof oldLookup === 'string' && /^node:\/\//.test(oldLookup)
            ? oldLookup.split('?')[0]
            : oldLookup;
        return originalResolve.call(linkLookupDataLoader, options, newLookup);
    };
    linkLookupDataLoader.resolveValue = newResolve.bind(linkLookupDataLoader);
});

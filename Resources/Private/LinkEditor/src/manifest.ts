import manifest from '@neos-project/neos-ui-extensibility';
import { LinkAttributeEditor } from './components/LinkAttributeEditor';
import { LinkEditor } from './components/LinkEditor';
import { Registry } from './util/useNeos';

manifest('Prgfx.Neos.LinkEditor:LinkEditor', {}, (globalRegistry: Registry, { frontendConfiguration }) => {
    const containerRegistry = globalRegistry.get('containers');

    containerRegistry.set(
        'LinkInput/OptionsPanel/LinkAttributeEditor',
        LinkAttributeEditor,
        'end'
    );

    const editorSettings: {linkEditor?: { replace: boolean }} = frontendConfiguration['Prgfx.Neos.LinkEditor'];
    if (editorSettings.linkEditor.replace) {
        const editorRegistry = globalRegistry.get('inspector').get('editors');
        editorRegistry.set('Neos.Neos/Inspector/Editors/LinkEditor', {
            component: LinkEditor,
        });
    }

    type DataLoader = { resolveValue: (options: unknown, identifier: string) => unknown };
    // we generate links with query arguments, but we want to ignore these arguments when looking up the node, so it
    // will still be displayed in the link editor
    const linkLookupDataLoader = globalRegistry.get('dataLoaders').get<DataLoader>('LinkLookup');
    const originalResolve = linkLookupDataLoader.resolveValue;
    const newResolve: typeof originalResolve = (options, oldLookup) => {
        const newLookup = typeof oldLookup === 'string' && /^node:\/\//.test(oldLookup)
            ? oldLookup.split('?')[0]
            : oldLookup;
        return originalResolve.call(linkLookupDataLoader, options, newLookup);
    };
    linkLookupDataLoader.resolveValue = newResolve.bind(linkLookupDataLoader);
});

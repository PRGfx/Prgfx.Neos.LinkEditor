# Prgfx.Neos.LinkEditor

Allows configuring inputs for query arguments in the link-editor.
Intended for adding tracking parameters.

`composer require prgfx/neos-linkeditor`

## Usage
```yaml
My.Package:NodeType:
  properties:
    text:
      ui:
        inline:
          editorOptions:
            linking:
              linkAttributes:
                # specify the label for a single query argument
                utm_campaign: Campaign
                # more options can be specified in an object
                utm_source:
                  label: UTM source
                  help: Description for this parameter
                # all labels accept translation IDs
                other:
                  label: My.Package:Main:i18nLabel
                  placeholder: Example value
                # unset attributes or attributes without label are ignored
                ignored_attribute: ~
```

[![Version](https://poser.pugx.org/prgfx/neos-linkeditor/version)](//packagist.org/packages/prgfx/neos-linkeditor)

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

### Group Inputs
In case you have multiple types of inputs, you can group them in a "meaningful" way:
```yaml
# ...
   linking:
    linkAttributes:
      utm_campaign:
        label: Campaign
        group: tracking
```
Groups can be configured in the frontend settings:
```yaml
Prgfx:
  Neos:
    LinkEditor:
      parameterGroups:
        tracking:
          # supports MyPackage:Source:key translation keys as well
          label: Tracking parameters
          # optional; if a value is set in that group, the group will always be expanded
          collapsed: true
```
The default group is called `default`, in case you want to overwrite its settings.

## Augment Links
For similar use-cases you may want to append additional arguments to links in certain contexts, e.g. set a "utm_source" argument in your email or RSS rendering.
For this you can overwrite the `Prgfx.Neos.LinkEditor:AdditionalArguments` fusion prototype:
```neosfusion
prototype(My.Package:RssItem) {
    prototype(Prgfx.Neos.LinkEditor:AdditionalArguments) {
        utm_source = 'rss'
    }
}
```

The attributes will be appended to links going through `Neos.Fusion:UriBuilder`, `Neos.Neos:NodeUri` and `Neos.Neos:ConvertUris`.
You can disable this behavior with the respective settings:
```yaml
Prgfx:
  Neos:
    LinkEditor:
      augmentLinks:
        NodeUri: true
        UriBuilder: true
        ConvertUris: true
```

## Note
This package overwrites the default LinkEditor to allow passing additional linking options to enable the parameter editor in the inspector editor.
You can disable this behavior in the settings:
```yaml
Neos:
  Neos:
    Ui:
      frontendConfiguration:
        Prgfx.Neos.LinkEditor:
          linkEditor:
            replace: false
```
See the package settings for more information

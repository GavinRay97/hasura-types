# Hasura Metadata Types Draft (WIP)

This repo contains a script used to generate SDK's in various languages from either Typescript or JSON Schema sources. The script is configurable and built to be consumed from something such as a Github Action or a git hook.

It is being used to generate SDK's for Hasura Metadata V2

- Typescript: ~240 Lines
- JSON Schema: ~930 Lines
- YAML JSON Schema: ~650 Lines

| Name in Types            | Official Name | Updated |
| ------------------------ | ------------- | ------- |
| HasuraMetadataV2         |               |         |
| FunctionType             |               |         |
| RemoteSchema             |               |         |
| Action                   |               |         |
| ActionDefinition         |               |         |
| ActionArgument           |               |         |
| PermissionElement        |               |         |
| CustomTypes              |               |         |
| Scalar                   |               |         |
| ActionObject             |               |         |
| ActionObjectRelationship |               |         |
| TableElement             |               |         |
| ArrayRelationship        |               |         |
| ArrayRelationshipUsing   |               |         |
| ObjectRelationship       |               |         |
| ObjectRelationshipUsing  |               |         |
| ForeignKeyConstraintOn   |               |         |
| ManualConfiguration      |               |         |
| Table                    |               |         |
| DeletePermission         |               |         |
| DeletePermissionOptions  |               |         |
| InsertPermission         |               |         |
| InsertPermissionOptions  |               |         |
| SelectPermission         |               |         |
| SelectPermissionOptions  |               |         |
| UpdatePermission         |               |         |
| UpdatePermissionOptions  |               |         |
| EventTrigger             |               |         |
| EventTriggerDefinition   |               |         |
| ColumnList               |               |         |
| Header                   |               |         |
| RetryConf                |               |         |
| AllowList                |               |         |
| QueryCollection          |               |         |
| Query                    |

| Official Name     |
| ----------------- |
| TableName         |
| QualifiedTable    |
| FunctionName      |
| QualifiedFunction |
| RoleName          |
| ComputedFieldName |
| PGColumnType      |
| PGColumn          |
| RelationshipName  |
| BoolExp           |
| AndExp            |
| OrExp             |
| NotExp            |
| ExistsExp         |
| TrueExp           |
| ColumnExp         |
| Operator          |
| Object            |
| Empty Object      |
| ColumnPresetsExp  |
| RemoteSchemaName  |
| RemoteSchemaDef   |
| CollectionName    |
| QueryName         |
| CollectionQuery   |
| CustomColumnNames |
| ActionName        |
| WebhookURL        |
| HeaderFromValue   |
| HeaderFromEnv     |
| GraphQLType       |
| GraphQLName       |
| InsertPermission  |
| SelectPermission  |
| UpdatePermission  |
| DeletePermission  |

```yaml
# Accepts "Typescript" or "JsonSchema"
# Override this with --typescript or --jsonschema from CLI
selected_input_language: Typescript

# Glob patterns for the target input files of selected language
input_files:
  # Paths can be either a string, or an array of strings
  JsonSchema: './src/types/**.schema.json'
  Typescript: './src/types/**.ts'

# Output file directory
output_directory: './generated'

# Quicktype config per-language
# Config is an object of type "rendererOptions"
# See: https://github.com/quicktype/quicktype/blob/master/src/quicktype-core/language/TypeScriptFlow.ts#L20
quicktype_config:
  # c++: ~
  # crystal: ~
  # csharp: ~
  # dart: ~
  # elm: ~
  # flow: ~
  go:
    package: hasura_metadata
  haskell: ~
  # java:
  #   package: org.hasura.metadata
  # kotlin:
  #   framework: kotlinx
  #   package: org.hasura.metadata
  # objective-c: ~
  # pike: ~
  python:
    python-version: '3.7'
  # ruby: ~
  # rust: ~
  schema: ~
  # swift: ~
  typescript: ~
  # rendererOptions:
  #   just-types: true
```

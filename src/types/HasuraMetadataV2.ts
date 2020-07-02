export interface HasuraMetadataV2 {
  /** @TJS-type integer */
  version: number
  tables: TableElement[]
  actions?: Action[]
  custom_types?: CustomTypes
  functions?: FunctionType[]
  remote_schemas?: RemoteSchema[]
  query_collections?: QueryCollection[]
  allowlist?: AllowList[]
}

/**
 * FUNCTIONS
 */

export interface FunctionType {
  function: Table
}

/**
 * REMOTE SCHEMAS
 */

export interface RemoteSchema {
  name: string
  definition: { url: string } | { url_from_env: string }
}

/**
 *  ACTIONS
 */

export interface Action {
  name: string
  definition: ActionDefinition
  permissions?: PermissionElement[]
}

export interface ActionDefinition {
  handler: string
  output_type?: string
  arguments?: ActionArgument[]
  type?: string
  kind?: string
}

export interface ActionArgument {
  name: string
  type: string
}

export interface PermissionElement {
  role: string
}

export interface CustomTypes {
  objects?: ActionObject[]
  input_objects?: ActionObject[]
  scalars?: Scalar[]
}

export interface Scalar {
  name: String
}

export interface ActionObject {
  name: string
  fields?: ActionArgument[]
  relationships?: ActionObjectRelationship[]
}

export interface ActionObjectRelationship {
  remote_table: Table
  name: string
  type: string
  field_mapping: { [key: string]: string }
}

/**
 * TABLES
 */

export interface TableElement {
  table: Table
  is_enum?: boolean
  event_triggers?: EventTrigger[]
  object_relationships?: ObjectRelationship[]
  array_relationships?: ArrayRelationship[]
  insert_permissions?: InsertPermission[]
  select_permissions?: SelectPermission[]
  delete_permissions?: DeletePermission[]
  update_permissions?: UpdatePermission[]
}

/**
 *  RELATIONSHIPS
 */

export interface ArrayRelationship {
  name: string
  using: ArrayRelationshipUsing
}

export interface ArrayRelationshipUsing {
  manual_configuration?: ManualConfiguration
  foreign_key_constraint_on?: ForeignKeyConstraintOn
}

export interface ObjectRelationship {
  name: string
  using: ObjectRelationshipUsing
}

export interface ObjectRelationshipUsing {
  manual_configuration?: ManualConfiguration
  foreign_key_constraint_on?: string
}

export interface ForeignKeyConstraintOn {
  column: string
  table: Table
}

export interface ManualConfiguration {
  remote_table: Table
  column_mapping: { [key: string]: string }
}

export interface Table {
  schema: string
  name: string
}

/**
 * PERMISSIONS
 */

export interface DeletePermission {
  role: string
  permission: DeletePermissionOptions
}

export interface DeletePermissionOptions {
  filter?: { [key: string]: object | string | number }
}

export interface InsertPermission {
  role: string
  permission: InsertPermissionOptions
}

export interface InsertPermissionOptions {
  check?: { [key: string]: object | string | number }
  columns: string[]
  backend_only?: boolean
  set?: { [key: string]: any }
}

export interface SelectPermission {
  role: string
  permission: SelectPermissionOptions
}

export interface SelectPermissionOptions {
  columns: string[]
  filter?: { [key: string]: object | string | number }
  allow_aggregations?: boolean
  /** @TJS-type integer */
  limit?: number
}

export interface UpdatePermission {
  role: string
  permission: UpdatePermissionOptions
}

export interface UpdatePermissionOptions {
  columns: string[]
  filter?: { [key: string]: object | string | number }
  check?: { [key: string]: object | string | number }
}

/**
 * EVENT TRIGGER
 */

export interface EventTrigger {
  name: string
  definition: EventTriggerDefinition
  retry_conf: RetryConf
  webhook: string
  headers?: Header[]
}

export interface EventTriggerDefinition {
  enable_manual: boolean
  insert?: ColumnList
  delete?: ColumnList
  update?: ColumnList
}

export interface ColumnList {
  columns: string | string[]
}

export interface Header {
  value: string
  name: string
}

export interface RetryConf {
  /** @TJS-type integer */
  num_retries: number
  /** @TJS-type integer */
  interval_sec: number
  /** @TJS-type integer */
  timeout_sec: number
}

/**
 * ALLOW LIST & QUERY COLLECTIONS
 */

export interface AllowList {
  collection: string
}

export interface QueryCollection {
  name: string
  definition: { queries: Query[] }
}

export interface Query {
  name: string
  query: string
}

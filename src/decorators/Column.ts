import { TableField } from '@google-cloud/bigquery';

export function BQColumn(options: TableField) {
  return function (target: object, propertyKey: string) {
    const metadataKey = 'bqColumnOptions';
    const existingMetadata = Reflect.getMetadata(metadataKey, target) || {};
    if (options) {
      existingMetadata[propertyKey] = options;
      Reflect.defineMetadata(metadataKey, existingMetadata, target);
    }
  };
}

export function getBQSchema(target: object): Record<string, TableField> {
  const metadataKey = 'bqColumnOptions';
  return Reflect.getMetadata(metadataKey, target);
}

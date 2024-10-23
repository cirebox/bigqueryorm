// src/decorators/Table.ts
import dayjs, { ManipulateType } from 'dayjs';
import { BQTableMetadata } from '../types';
import { FieldModeEnum } from '../enum/field-mode.enum';
import { TableMetadata } from '@google-cloud/bigquery';

export type BQTableOptions = {
  name: string;
  prefix?: ManipulateType;
  suffix?: ManipulateType;
  datasetId?: string;
  tableId?: string;
  projectId?: string;
} & TableMetadata;

export function BQTable(metadata: BQTableMetadata): ClassDecorator {
  return function (target: any) {
    metadata['tableId'] = metadata.name;
    const metadataKey = 'bqColumnOptions';
    const columnsMetadata = Reflect.getMetadata(metadataKey, target.prototype);

    target.prototype.toBQObject = function (): Record<string, unknown> {
      const bqObject: Record<string, unknown> = {};
      const propertyKeys = Object.keys(columnsMetadata);
      for (const propertyKey of propertyKeys) {
        const columnMetadata = columnsMetadata[propertyKey];
        if (columnMetadata) {
          const columnName = columnMetadata.name;
          const columnType = columnMetadata.type;
          const columnMode = columnMetadata.mode;

          if (columnMode === 'REQUIRED' && !this[propertyKey]) {
            throw Error(
              `Campo ${propertyKey} é requerido mas não foi passado valor.`
            );
          }

          if (!columnType || columnMode === FieldModeEnum.REPEATED) {
            bqObject[columnName] = this[propertyKey];
          }

          switch (columnType) {
            case 'STRING':
              bqObject[columnName] = String(this[propertyKey]);
              break;
            case 'NUMBER':
            case 'INTEGER':
            case 'INT64':
            case 'FLOAT':
            case 'FLOAT64':
              bqObject[columnName] = Number(this[propertyKey]);
              break;
            case 'TIMESTAMP':
              bqObject[columnName] = dayjs(this[propertyKey]).format(
                "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
              );
              break;
            case 'DATE':
              bqObject[columnName] = dayjs(this[propertyKey])
                .format('yyyy-MM-dd')
                .toString();
              break;
            case 'TIME':
              bqObject[columnName] = dayjs(this[propertyKey]).format(
                'HH:mm:ss'
              );
              break;
            case 'DATETIME':
              bqObject[columnName] = dayjs(this[propertyKey]).toDate();
              break;
            case 'BYTES':
            case 'GEOGRAPHY':
            case 'NUMERIC':
            case 'BIGNUMERIC':
            case 'RECORD':
            case 'STRUCT':
              bqObject[columnName] = this[propertyKey];
              break;
            case 'BOOLEAN':
            case 'BOOL':
              bqObject[columnName] = Boolean(this[propertyKey]);
              break;
            case 'JSON':
              bqObject[columnName] = JSON.stringify(this[propertyKey]);
              break;
            default:
              throw Error(
                'Falha na conversão de tipo para BigQuery! Revise a entidade.'
              );
          }
        }
      }

      return bqObject;
    };

    target.prototype.fromBQObject = function (
      bqObject: Record<string, unknown>
    ): unknown {
      const instance = new target();
      const propertyKeys = Object.keys(columnsMetadata);
      for (const propertyKey of propertyKeys) {
        const columnMetadata = columnsMetadata[propertyKey];
        if (columnMetadata) {
          const columnName = columnMetadata.name;
          instance[propertyKey] = bqObject[columnName];
        }
      }
      return instance;
    };

    Reflect.defineMetadata('bqTableOptions', metadata, target);
  };
}

export function getBQTableOptions(target: object): BQTableOptions {
  return Reflect.getMetadata('bqTableOptions', target);
}

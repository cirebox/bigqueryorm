import { TableField } from "@google-cloud/bigquery";
import bigquery from "@google-cloud/bigquery/build/src/types";
import { BQTableMetadata, ColumnMetadata } from "../types";

export function getDataSetMetadata(datasetName: string): string {
  return Reflect.getMetadata('dataset', datasetName);
}

export function getTableMetadata(metadata: BQTableMetadata): Record<string, bigquery.ITableFieldSchema> {
  return Reflect.getMetadata('table', metadata);
}

// export function getIndexMetadata(metadata: ColumnOptions): Record<string, TableField> {
//   return Reflect.getMetadata('index', metadata);
// }

export function getColummMetadata(metadata: ColumnMetadata): Record<string, TableField> {
  return Reflect.getMetadata('column', metadata);
}
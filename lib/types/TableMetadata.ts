import { TableMetadata } from '@google-cloud/bigquery/build/src/table';
import { ManipulateType } from 'dayjs';

export type BQTableMetadata = {
  name: string;
  prefix?: ManipulateType;
  suffix?: ManipulateType;
  datasetName?: string;
  tableId?: string;
  projectId?: string;
  partitionBy?: string;
  clusterBy?: string[];
} & TableMetadata;

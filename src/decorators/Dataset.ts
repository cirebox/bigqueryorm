import 'reflect-metadata';
import { DatasetResource } from '@google-cloud/bigquery';
import { ManipulateType } from 'dayjs';

export type BQDatasetOptions = {
  name: string;
  suffix?: ManipulateType;
  projectId?: string;
  datasetId: string;
} & DatasetResource;

export function BQDataset(options: BQDatasetOptions) {
  return function (target: object) {
    options['datasetId'] = options.name;

    Reflect.defineMetadata('bqDatasetOptions', options, target);
  };
}

export function getDatasetOptions(target: object): BQDatasetOptions {
  return Reflect.getMetadata('bqDatasetOptions', target);
}

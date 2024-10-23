import {
  InsertRowsResponse,
  SimpleQueryRowsResponse,
} from '@google-cloud/bigquery';
import { FindManyOptions } from '../find-options';
import { FindResult } from '../query-builder/result';

export interface IRepository<Entity extends object> {
  // loadFromCsv(csvFilePath: string): Promise<void>;
  query(query: string): Promise<SimpleQueryRowsResponse>;
  insert<DTO>(dto: DTO): Promise<InsertRowsResponse>;
  find(options?: FindManyOptions<Entity>): Promise<FindResult<Entity>>;
  // findOne(options: FindOneOptions<Entity>): Promise<Entity | null>;
}

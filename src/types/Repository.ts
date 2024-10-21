import { FindManyOptions, FindOneOptions } from "../find-options";
import { FindResult } from "../query-builder/result";

export interface IRepository<Entity extends Object> {
  loadFromCsv(csvFilePath: string): Promise<void>;
  query(query: string): Promise<any[]>;
  insert<DTO>(dto: DTO): Promise<any>;
  find(options?: FindManyOptions<Entity>): Promise<FindResult<Entity>>;
  findOne(options: FindOneOptions<Entity>): Promise<Entity | null>
}
import { ConnectionOrm } from "../connection/ConnectionOrm";
import { FindManyOptions, FindOneOptions } from "../find-options";
import { SelectBuilder, WhereBuilder } from "../query-builder";
import { FindResult } from "../query-builder/result";
import { BQTableMetadata, IRepository } from "../types";

export class Repository<Entity extends Object> implements IRepository<Entity> {
  private readonly connection: ConnectionOrm;
  private readonly tableMetadata: BQTableMetadata;

  constructor(_connection: ConnectionOrm, _entity: Entity) {
    this.connection = _connection;
    this.tableMetadata = Reflect.getMetadata('table', _entity);
    if (!this.connection.config.datasetName && !this.tableMetadata?.datasetName) throw new Error(`Missing dataset metadata for entity: ${_entity}`);
    if (!this.tableMetadata?.name) throw new Error(`Missing tableName metadata for entity: ${_entity}`);
  }

  loadFromCsv(csvFilePath: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  query(query: string): Promise<any[]> {
    throw new Error("Method not implemented.");
  }

  insert<DTO>(dto: DTO): Promise<any> {
    throw new Error("Method not implemented.");
  }

  /**
   * Finds multiple entities based on provided options.
   */
  async find<Entity>(options?: FindManyOptions<Entity>): Promise<FindResult<Entity>> {
    const datasetName = this.connection.config.datasetName ?? this.tableMetadata.datasetName;
    const queryBuilder = new SelectBuilder<Entity>(`${datasetName}.${this.tableMetadata.name}`);

    if (options?.where) {
      Object.keys(options.where).forEach(key => {
        queryBuilder.where(`${key} = ${JSON.stringify((options.where as any)[key])}`);
      });
    }

    if (options?.order) {
      Object.keys(options.order).forEach(key => {
        queryBuilder.orderBy(key as keyof Entity, 'DESC'); //options.order[key]
      });
    }

    if (options?.take) {
      queryBuilder.limit(options.take);
    }

    const query = queryBuilder.build();
    const [rows] = await this.connection.query({ query });
    const result = new FindResult<Entity>(rows, rows.length); // Criar um objeto com os dados e total
    return result;
  }

  /**
   * Finds a single entity based on provided options.
   */
  async findOne(options: FindOneOptions<Entity>): Promise<Entity | null> {
    const query = `SELECT * FROM ${this.tableMetadata.name}.${this.tableMetadata.name} ${WhereBuilder<Entity>(options.where)} LIMIT 1`;
    const [rows] = await this.connection.query({ query });
    return rows[0] ?? null;
  }
}
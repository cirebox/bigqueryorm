import {
  BigQuery,
  InsertRowsResponse,
  QueryResultsOptions,
  SimpleQueryRowsResponse,
  Table,
} from '@google-cloud/bigquery';
import { getBQSchema } from '../decorators/Column';
import { FindManyOptions } from '../find-options';
import { SelectBuilder } from '../query-builder';
import { FindResult } from '../query-builder/result';
import { IRepository } from '../types';
import { getDatasetOptions } from '../decorators/Dataset';
import { getBQTableOptions } from '../decorators/Table';

export class Repository<Entity extends object> implements IRepository<Entity> {
  private bigQuery?: BigQuery;
  private table?: Table;

  constructor(entity: Entity) {
    this.init(entity);
  }

  private async init(entity: Entity): Promise<void> {
    if (process.env.GCP_BIGQUERY_SYNC ?? true) {
      const table = await this.getOrCreateTable(entity.constructor);
      this.bigQuery = table.bigQuery;
      this.table = table;
    }
  }

  private async getOrCreateTable(target: any): Promise<Table> {
    const dataSetOptions = getDatasetOptions(target);
    const { projectId, tableId, ...tableMetadata } = getBQTableOptions(target);

    const datasetId = dataSetOptions?.name;
    const dataset = datasetId || process.env.GCP_BIGQUERY_DATASET_ID;
    const project = projectId ?? process.env.GCP_BIGQUERY_PROJECT_ID;

    if (!dataset) throw new Error('undefined dataset');
    if (!tableId) throw new Error('undefined tableId');

    const bq = new BigQuery({ projectId: project });

    let db = bq.dataset(dataset);

    const [datasetExists] = await db.exists();
    if (!datasetExists) {
      try {
        const [Dataset] = await bq.createDataset(dataset);
        db = Dataset;
      } catch (error) {
        console.error(`Erro ao criar tabela ${dataset} big query:`, error);
        throw error;
      }
    }

    const table = db.table(tableId);
    const [tableExists] = await table.exists();
    if (tableExists) {
      return table;
    }

    try {
      const schema = getBQSchema(target.prototype);
      const [table] = await db.createTable(tableId, {
        ...tableMetadata,
        schema: Object.values(schema),
      });

      console.log(`Tabela ${table.id} criada.`);

      return table;
    } catch (error) {
      console.error(`Erro ao criar tabela ${table.id} big query:`, error);
      throw error;
    }
  }

  // loadFromCsv(csvFilePath: string): Promise<void> {
  //   throw new Error('Method not implemented.');
  // }

  async query(
    query: string,
    options?: QueryResultsOptions | undefined
  ): Promise<SimpleQueryRowsResponse> {
    return await this.bigQuery!.query({ query }, options);
  }

  async insert<DTO>(dto: DTO): Promise<InsertRowsResponse> {
    return await this.table!.insert(dto);
  }

  /**
   * Finds multiple entities based on provided options.
   */
  async find<Entity>(
    options?: FindManyOptions<Entity>
  ): Promise<FindResult<Entity>> {
    const queryBuilder = new SelectBuilder<Entity>(
      `${this.table!.dataset.projectId}.${this.table!.dataset.id}.${this.table!.id}`
    );

    if (options?.where) {
      Object.keys(options.where).forEach((key) => {
        queryBuilder.where(
          `${key} = ${JSON.stringify((options.where as any)[key])}`
        );
      });
    }

    if (options?.order) {
      Object.keys(options.order).forEach((key) => {
        queryBuilder.orderBy(key as keyof Entity, 'DESC'); //options.order[key]
      });
    }

    if (options?.take) {
      queryBuilder.limit(options.take);
    }

    const query = queryBuilder.build();
    const [rows] = await this.bigQuery!.query({ query });
    const result = new FindResult<Entity>(rows, rows.length); // Criar um objeto com os dados e total
    return result;
  }

  /**
   * Finds a single entity based on provided options.
   */
  // async findOne(options: FindOneOptions<Entity>): Promise<Entity | null> {
  //   const query = `SELECT * FROM ${this.table.dataset.projectId}.${this.table.dataset.id}.${this.table.id} ${WhereBuilder<Entity>(options.where)} LIMIT 1`;
  //   const [rows] = await this.bigQuery.query({ query });
  //   return rows[0] ?? null;
  // }

  // async findOne<DTO>(
  //   dto: DTO,
  //   relations?: string[],
  //   sort?: { [K in keyof Entity]: 'ASC' | 'DESC' },
  // ): Promise<Entity> {
  //   const { params, query, types } = dto as {
  //     query?: string;
  //     params?: Record<string, unknown>;
  //     types?: string[];
  //   };
  //   console.log('params', params);
  //   const sql =
  //     query ||
  //     `SELECT * FROM ${this.table.dataset.projectId}.${this.table.dataset.id}.${this.table.id} WHERE ${Object.keys(
  //       params,
  //     )
  //       .map((key) => `${key} = @${key}`)
  //       .join(' AND ')}`;
  //   const options: QueryOptions = { maxResults: 1, timeoutMs: 5 };
  //   const { rows } = await this.callQuery(sql, params, types, options);
  //   return rows[0] as Entity;
  // }

  // async findMany<DTO>(
  //   dto: DTO,
  //   relations?: string[],
  //   sort?: { [K in keyof Entity]: 'ASC' | 'DESC' },
  // ): Promise<Entity[] | []> {
  //   const { params, query, types } = dto as {
  //     params?: Record<string, unknown>;
  //     query?: string;
  //     types: string[];
  //   };
  //   const sql =
  //     query ||
  //     `SELECT * FROM ${this.table.dataset.projectId}.${this.table.dataset.id}.${this.table.id} WHERE ${Object.keys(
  //       params,
  //     )
  //       .map((key) => `${key} = @${key}`)
  //       .join(' AND ')}`;
  //   const options: QueryOptions = {
  //     maxResults: 3 * 10 * 1000,
  //     timeoutMs: 5,
  //     autoPaginate: true,
  //   };
  //   const { rows } = await this.callQuery(sql, params, types, options);
  //   return rows as Entity[];
  // }

  // async findManyWithPagination<DTO>(
  //   dto: DTO,
  //   page: number,
  //   limit: number,
  // ): Promise<PaginationResult<Entity>> {
  //   const { query: sql } = dto as { query?: string };
  //   const options: QueryOptions = {
  //     maxResults: limit,
  //     timeoutMs: 5,
  //     autoPaginate: true,
  //   };
  //   const { rows, totalRows } = await this.callQuery(sql, options);
  //   const totalRecords = Number(totalRows);
  //   const totalPages = Math.ceil(totalRecords / limit);

  //   return {
  //     data: rows as Entity[],
  //     totalRecords: Number(totalRows),
  //     nextPage: page < totalPages,
  //     totalPages,
  //     page,
  //     limit,
  //   };
  // }

  // async exist<DTO>(dto: DTO): Promise<boolean> {
  //   const query = `SELECT COUNT(*) AS count FROM ${this.table.dataset.projectId}.${this.table.dataset.id}.${this.table.id} WHERE ${Object.keys(
  //     dto,
  //   )
  //     .map((key) => `${key} = @${key}`)
  //     .join(' AND ')}`;
  //   const options: QueryOptions = { maxResults: 1, timeoutMs: 5 };
  //   try {
  //     const [rows] = await this.bigQuery.query(query, options);
  //     return rows[0].count > 0;
  //   } catch (error) {
  //     console.error(
  //       'Erro ao verificar a existência de dados no BigQuery:',
  //       error,
  //     );
  //     throw error;
  //   }
  // }

  // async callQuery(
  //   sql: string,
  //   params?: Record<string, unknown>,
  //   types?: string[],
  //   options: QueryOptions = { timeoutMs: 20000 },
  // ): Promise<{ rows: unknown[]; totalRows?: string; errors?: object }> {
  //   try {
  //     console.log('sql', sql);
  //     console.log('params', params);
  //     if (params || types) {
  //       const [rows] = await this.bigQuery.query(
  //         { query: sql, params, types },
  //         options,
  //       );
  //       return { rows };
  //     } else {
  //       const result = await this.bigQuery.query(sql, options);
  //       let rows = [];
  //       let totalRows = '0';
  //       let errors = {};
  //       if (result) {
  //         console.log('result', result.length);
  //         if (result.length > 3) {
  //           totalRows = result[2]?.totalRows;
  //           errors = result[2]?.errors;
  //           rows = result[2]?.rows;
  //         } else {
  //           totalRows = String(result[0]?.length);
  //           rows = result[0];
  //         }
  //       }
  //       return { rows, totalRows, errors };
  //     }
  //   } catch (error) {
  //     console.error('Erro ao executar a consulta no BigQuery:', error);
  //     throw new Error(`Falha ao encontrar dados no BigQuery! Erro: ${error}`);
  //   }
  // }
}

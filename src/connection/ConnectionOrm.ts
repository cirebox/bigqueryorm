import { BigQuery, BigQueryOptions, Dataset, DatasetOptions, DatasetResponse, Query, QueryOptions, Table, TableOptions } from '@google-cloud/bigquery';
import bigquery from '@google-cloud/bigquery/build/src/types';
import { BQTableMetadata } from '../types';

export interface BigQueryOptionsOrm extends BigQueryOptions {
  sync: boolean;
  datasetName?: string
}

export class ConnectionOrm {
  private static instance: ConnectionOrm;
  private readonly client: BigQuery;
  config: BigQueryOptionsOrm;
  table?: Table;

  constructor(
    private readonly _config: BigQueryOptionsOrm,
  ) {
    this.client = new BigQuery({
      projectId: _config.projectId,
      keyFilename: _config.keyFilename,
    });
    this.config = _config;
  }

  static getInstance(config: BigQueryOptionsOrm): ConnectionOrm {
    if (!ConnectionOrm.instance) {
      ConnectionOrm.instance = new ConnectionOrm(config);
    }

    return ConnectionOrm.instance;
  }

  async connect(): Promise<boolean> {
    try {
      const [rows] = await this.client.query('SELECT 1');
      console.log('Connected to BigQuery');
      return rows.length > 0;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getTable(tableMetadata: BQTableMetadata): Promise<Table> {
    const datasetName = this.config.datasetName ?? tableMetadata.datasetName;
    if (!datasetName) throw new Error('Undefined datasetName when creating table');
    let db = this.getDataset(datasetName)

    const [datasetExists] = await db.exists();
    if (!datasetExists) {
      try {
        const [Dataset] = await this.createDataset(datasetName);
        db = Dataset;
      } catch (error) {
        console.error(`Erro ao criar dataset ${datasetName} no big query:`, error);
        throw error;
      }
    }

    const table = this.getTableRef(tableMetadata.name, datasetName);
    const [tableExists] = await table.exists();
    if (tableExists) {
      return table;
    }

    try {
      // const schema = getColummMetadata(target.prototype);
      // const [table] = await db.createTable(tableMetadata.name, { ...tableMetadata, schema: Object.values(schema) });
      // console.log(`Tabela ${table.id} criada.`);
      return table;
    } catch (error) {
      console.error(`Erro ao criar tabela ${tableMetadata.name} big query:`, error);
      throw error;
    }
  }

  getDataset(name?: string, options?: DatasetOptions | undefined): Dataset {
    if (!this.client)
      throw new Error('Not connected to BigQuery. Call connect() first.');

    const datasetName = name ?? this.config.datasetName;
    if (!datasetName) throw new Error('Undefined dataset when creating table');

    return this.client.dataset(datasetName, options);
  }

  getTableRef(tableName: string, dataset?: string, tableOptions?: TableOptions | undefined): Table {
    if (!this.client)
      throw new Error('Not connected to BigQuery. Call connect() first.');

    const ds = this.getDataset(dataset);
    if (!ds) throw new Error('Undefined dataset when selecting table');

    return ds.table(tableName);
  }

  async createDataset(name: string, options?: bigquery.IDataset | undefined): Promise<DatasetResponse> {
    if (!this.client)
      throw new Error('Not connected to BigQuery. Call connect() first.');
    return await this.client.createDataset(name, options);
  }

  async runQuery(query: string): Promise<any[]> {
    if (!this.client)
      throw new Error('Not connected to BigQuery. Call connect() first.');
    const [job] = await this.client.createQueryJob({ query });
    const [rows] = await job.getQueryResults();
    return rows;
  }

  async query(query: Query, options?: QueryOptions): Promise<any[]> {
    if (!this.client)
      throw new Error('Not connected to BigQuery. Call connect() first.');

    // if (this.config.sync) {
    //   this.table = await this.getTable();
    // }  

    const [rows] = await this.client.query(query, options);
    return rows;
  }
}

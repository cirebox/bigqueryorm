export type ColumnMetadata = {
  name: string;
  type?: 'STRING' | 'INTEGER' | 'FLOAT' | 'BOOLEAN' | 'BIGNUMERIC' | 'DATE' | 'TIMESTAMP' | 'JSON';
  mode?: 'NULLABLE' | 'REQUIRED' | 'REPEATED';
  description?: string;
}
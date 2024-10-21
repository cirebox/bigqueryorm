interface ColumnDefinition {
  name: string;
  type: string;
  mode?: string;
}

export class SchemaBuilder {
  static createTable(tableName: string, columns: ColumnDefinition[]): string {
    const columnsDefinition = columns
      .map((col) => `${col.name} ${col.type} ${col.mode ? col.mode : ''}`)
      .join(', ');

    return `CREATE TABLE \`${tableName}\` (${columnsDefinition})`;
  }

  static dropTable(tableName: string): string {
    return `DROP TABLE \`${tableName}\``;
  }

  static alterTableAddColumn(
    tableName: string,
    column: ColumnDefinition
  ): string {
    return `ALTER TABLE \`${tableName}\` ADD COLUMN ${column.name} ${column.type
      } ${column.mode ? column.mode : ''}`;
  }
}

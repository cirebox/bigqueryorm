export class InsertBuilder<Entity> {
  private readonly tableId: string;
  private readonly _values: Partial<Entity>[] = [];

  constructor(tableId: string) {
    this.tableId = tableId;
  }

  values(entity: Partial<Entity>): this {
    this._values.push(entity);
    return this;
  }

  build(): string {
    const columns = Object.keys(this._values[0]);
    const values = this._values.map(entity => {
      return `(${columns.map(col => JSON.stringify((entity as any)[col])).join(', ')})`;
    }).join(', ');

    return `INSERT INTO \`${this.tableId}\` (${columns.join(', ')}) VALUES ${values}`;
  }
}

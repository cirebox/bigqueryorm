export class UpdateBuilder<Entity> {
  private readonly tableId: string;
  private readonly setConditions: string[] = [];
  private readonly whereConditions: string[] = [];

  constructor(tableId: string) {
    this.tableId = tableId;
  }

  set(column: keyof Entity, value: any): this {
    this.setConditions.push(`${String(column)} = ${JSON.stringify(value)}`);
    return this;
  }

  where(condition: string): this {
    this.whereConditions.push(condition);
    return this;
  }

  build(): string {
    let query = `UPDATE \`${this.tableId}\` SET ${this.setConditions.join(', ')}`;
    if (this.whereConditions.length > 0) {
      query += ` WHERE ${this.whereConditions.join(' AND ')}`;
    }
    return query;
  }
}

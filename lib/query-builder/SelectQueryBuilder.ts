export class SelectBuilder<Entity> {
  private readonly tableId: string;
  private readonly whereConditions: string[] = [];
  private readonly orderConditions: string[] = [];
  private limitCondition?: number;

  constructor(tableId: string) {
    this.tableId = tableId;
  }

  where(condition: string): this {
    this.whereConditions.push(condition);
    return this;
  }

  orderBy(column: keyof Entity, direction: 'ASC' | 'DESC'): this {
    this.orderConditions.push(`${String(column)} ${direction}`);
    return this;
  }

  limit(limit: number): this {
    this.limitCondition = limit;
    return this;
  }

  build(): string {
    let query = `SELECT * FROM \`${this.tableId}\``;
    if (this.whereConditions.length > 0) {
      query += ` WHERE ${this.whereConditions.join(' AND ')}`;
    }
    if (this.orderConditions.length > 0) {
      query += ` ORDER BY ${this.orderConditions.join(', ')}`;
    }
    if (this.limitCondition !== undefined) {
      query += ` LIMIT ${this.limitCondition}`;
    }
    return query;
  }
}

export class DeleteBuilder<Entity> {
  private readonly tableId: string;
  private readonly whereConditions: string[] = [];

  constructor(tableId: string) {
    this.tableId = tableId;
  }

  where(condition: string): this {
    this.whereConditions.push(condition);
    return this;
  }

  build(): string {
    let query = `DELETE FROM \`${this.tableId}\``;
    if (this.whereConditions.length > 0) {
      query += ` WHERE ${this.whereConditions.join(' AND ')}`;
    }
    return query;
  }
}

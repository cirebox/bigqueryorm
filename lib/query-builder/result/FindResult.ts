export class FindResult<Entity> {
  data: Entity[];
  total: number;

  constructor(data: Entity[], total: number) {
    this.data = data;
    this.total = total;
  }
}

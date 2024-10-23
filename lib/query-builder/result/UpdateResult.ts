export class UpdateResult {
  affectedRows: number;

  constructor(affectedRows: number) {
    this.affectedRows = affectedRows;
  }
}

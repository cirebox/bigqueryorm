export class InsertResult {
  affectedRows: number;

  constructor(affectedRows: number) {
    this.affectedRows = affectedRows;
  }
}

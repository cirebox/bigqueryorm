export class DeleteResult {
  affectedRows: number;

  constructor(affectedRows: number) {
    this.affectedRows = affectedRows;
  }
}

import { BigQueryConnection } from '../src/connection';

describe('BigQueryConnection', () => {
  it('should initialize BigQuery with credentials', () => {
    const connection = new BigQueryConnection({ projectId: 'test_project', keyFilename: '/path/to/keyfile.json' });
    expect(connection.bigQuery).toBeDefined();
  });
});

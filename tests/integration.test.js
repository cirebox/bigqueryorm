import { BigQueryConnection } from '../src/connection';
import { BigQueryRepository } from '../src/repository';
import { Dataset, Table, Column } from '../src/decorators';

@Dataset('my_dataset')
@Table({ partitionBy: 'DATE(timestamp)', clusterBy: ['user_id'] })
class UserEvents {
  @Column({ type: 'STRING', mode: 'REQUIRED' })
  user_id;

  @Column({ type: 'TIMESTAMP', mode: 'REQUIRED' })
  timestamp;

  @Column({ type: 'STRING', mode: 'REQUIRED' })
  event_type;

  @Column({ type: 'JSON' })
  event_data;
}

describe('Integration Test', () => {
  let connection;
  let userEventsRepo;

  beforeAll(async () => {
    connection = new BigQueryConnection({ projectId: 'your-project-id', keyFilename: '/path/to/keyfile.json' });
    await connection.connect();
    userEventsRepo = new BigQueryRepository(connection, UserEvents);
  });

  it('should insert and query data from BigQuery', async () => {
    await userEventsRepo.insert([{ user_id: '123', timestamp: new Date(), event_type: 'login', event_data: { ip: '192.168.1.1' } }]);
    const results = await userEventsRepo.query('SELECT * FROM `my_dataset.UserEvents`');
    expect(results.length).toBeGreaterThan(0);
  });
});

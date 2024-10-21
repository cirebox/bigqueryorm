import { BigQueryRepository } from '../src/repository';

describe('BigQueryRepository', () => {
  let repository;
  const mockConnection = { bigQuery: { dataset: jest.fn() } };
  const mockEntity = { datasetName: 'test_dataset', tableOptions: { name: 'test_table' } };

  beforeEach(() => {
    repository = new BigQueryRepository(mockConnection, mockEntity);
  });

  it('should insert data into BigQuery', async () => {
    const insertMock = jest.fn();
    mockConnection.bigQuery.dataset.mockReturnValue({ table: () => ({ insert: insertMock }) });

    await repository.insert([{ user_id: '123' }]);
    expect(insertMock).toHaveBeenCalledWith([{ user_id: '123' }]);
  });
});

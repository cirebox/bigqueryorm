import { Dataset, Table, Column } from '../src/decorators';

describe('Decorators', () => {
  it('should define dataset', () => {
    @Dataset('my_dataset')
    class TestEntity { }

    expect(TestEntity.datasetName).toBe('my_dataset');
  });

  it('should define table options', () => {
    @Table({ partitionBy: 'DATE(timestamp)', clusterBy: ['user_id'] })
    class TestEntity { }

    expect(TestEntity.tableOptions.partitionBy).toBe('DATE(timestamp)');
    expect(TestEntity.tableOptions.clusterBy).toEqual(['user_id']);
  });

  it('should define columns', () => {
    class TestEntity {
      @Column({ type: 'STRING', mode: 'REQUIRED' })
      user_id;
    }

    const columns = new TestEntity().constructor.columns;
    expect(columns[0]).toEqual({ name: 'user_id', type: 'STRING', mode: 'REQUIRED' });
  });
});

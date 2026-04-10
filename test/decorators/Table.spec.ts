import 'reflect-metadata';
import { BQTable } from '../../lib/decorators/Table';

describe('BQTable Decorator', () => {
  it('should define table metadata on the target class', () => {
    @BQTable({ name: 'users' })
    class User {}

    const metadata = Reflect.getMetadata('bqTableOptions', User);
    expect(metadata).toBeDefined();
    expect(metadata.name).toBe('users');
    expect(metadata.tableId).toBe('users');
  });

  it('should set tableId from name if not provided', () => {
    @BQTable({ name: 'orders' })
    class Order {}

    const metadata = Reflect.getMetadata('bqTableOptions', Order);
    expect(metadata.tableId).toBe('orders');
  });

  it('should preserve table metadata options', () => {
    @BQTable({ name: 'products', partitionExpirationDays: 30 })
    class Product {}

    const metadata = Reflect.getMetadata('bqTableOptions', Product);
    expect(metadata.name).toBe('products');
    expect(metadata.partitionExpirationDays).toBe(30);
  });

  it('should attach toBQObject method to the prototype', () => {
    @BQTable({ name: 'test_table' })
    class TestEntity {}

    expect(TestEntity.prototype.toBQObject).toBeDefined();
    expect(typeof TestEntity.prototype.toBQObject).toBe('function');
  });

  it('should attach fromBQObject method to the prototype', () => {
    @BQTable({ name: 'test_table' })
    class TestEntity {}

    expect(TestEntity.prototype.fromBQObject).toBeDefined();
    expect(typeof TestEntity.prototype.fromBQObject).toBe('function');
  });

  describe('toBQObject', () => {
    it('should convert string fields correctly', () => {
      @BQTable({ name: 'users' })
      class User {
        name: string = 'John Doe';
      }

      const instance = new User();
      const bqObj = instance.toBQObject();
      expect(bqObj['name']).toBe('John Doe');
    });

    it('should convert number fields correctly', () => {
      @BQTable({ name: 'users' })
      class User {
        age: number = 25;
      }

      const instance = new User();
      const bqObj = instance.toBQObject();
      expect(bqObj['age']).toBe(25);
    });

    it('should convert boolean fields correctly', () => {
      @BQTable({ name: 'users' })
      class User {
        isActive: boolean = true;
      }

      const instance = new User();
      const bqObj = instance.toBQObject();
      expect(bqObj['isActive']).toBe(true);
    });

    it('should handle TIMESTAMP fields using dayjs format', () => {
      @BQTable({ name: 'events' })
      class Event {
        timestamp: Date = new Date('2024-01-15T10:30:00.000Z');
      }

      const instance = new Event();
      const bqObj = instance.toBQObject();
      expect(typeof bqObj['timestamp']).toBe('string');
      expect(bqObj['timestamp']).toContain('2024-01-15');
    });

    it('should handle DATE fields using dayjs format', () => {
      @BQTable({ name: 'records' })
      class Record {
        date: Date = new Date('2024-06-20');
      }

      const instance = new Record();
      const bqObj = instance.toBQObject();
      expect(typeof bqObj['date']).toBe('string');
      expect(bqObj['date']).toContain('2024-06-20');
    });
  });

  describe('fromBQObject', () => {
    it('should map BigQuery object back to entity instance', () => {
      @BQTable({ name: 'users' })
      class User {
        id: string = '';
        name: string = '';
      }

      const bqData: Record<string, unknown> = {
        id: 'user-123',
        name: 'Jane Doe',
      };

      const instance = User.prototype.fromBQObject(bqData) as User;
      expect(instance.id).toBe('user-123');
      expect(instance.name).toBe('Jane Doe');
    });
  });
});
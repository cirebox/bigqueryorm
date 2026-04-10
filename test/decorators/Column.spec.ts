import 'reflect-metadata';
import { BQColumn } from '../../lib/decorators/Column';

describe('BQColumn Decorator', () => {
  it('should define column metadata on the target class', () => {
    class User {
      @BQColumn({ name: 'USER_ID', type: 'STRING', mode: 'REQUIRED' })
      id!: string;
    }

    const metadata = Reflect.getMetadata('bqColumnOptions', User.prototype);
    expect(metadata).toBeDefined();
    expect(metadata.id).toBeDefined();
    expect(metadata.id.name).toBe('USER_ID');
    expect(metadata.id.type).toBe('STRING');
    expect(metadata.id.mode).toBe('REQUIRED');
  });

  it('should handle multiple columns on the same class', () => {
    class Product {
      @BQColumn({ name: 'PRODUCT_ID', type: 'STRING', mode: 'REQUIRED' })
      id!: string;

      @BQColumn({ name: 'PRODUCT_NAME', type: 'STRING', mode: 'REQUIRED' })
      name!: string;

      @BQColumn({ name: 'PRODUCT_PRICE', type: 'FLOAT', mode: 'NULLABLE' })
      price?: number;
    }

    const metadata = Reflect.getMetadata('bqColumnOptions', Product.prototype);
    expect(Object.keys(metadata)).toHaveLength(3);
    expect(metadata.id.name).toBe('PRODUCT_ID');
    expect(metadata.name.name).toBe('PRODUCT_NAME');
    expect(metadata.price.name).toBe('PRODUCT_PRICE');
    expect(metadata.price.mode).toBe('NULLABLE');
  });

  it('should preserve all column options', () => {
    class Order {
      @BQColumn({
        name: 'ORDER_DATE',
        type: 'DATE',
        mode: 'REQUIRED',
        description: 'Date of the order',
      })
      orderDate!: Date;
    }

    const metadata = Reflect.getMetadata('bqColumnOptions', Order.prototype);
    expect(metadata.orderDate.name).toBe('ORDER_DATE');
    expect(metadata.orderDate.type).toBe('DATE');
    expect(metadata.orderDate.mode).toBe('REQUIRED');
    expect(metadata.orderDate.description).toBe('Date of the order');
  });

  it('should handle nullable columns', () => {
    class User {
      @BQColumn({ name: 'NICKNAME', type: 'STRING', mode: 'NULLABLE' })
      nickname?: string;
    }

    const metadata = Reflect.getMetadata('bqColumnOptions', User.prototype);
    expect(metadata.nickname.mode).toBe('NULLABLE');
  });
});

describe('getBQSchema', () => {
  it('should return the schema metadata from the target', () => {
    class User {
      @BQColumn({ name: 'USER_ID', type: 'STRING', mode: 'REQUIRED' })
      id!: string;

      @BQColumn({ name: 'USER_NAME', type: 'STRING', mode: 'REQUIRED' })
      name!: string;
    }

    const { getBQSchema } = require('../../lib/decorators/Column');
    const schema = getBQSchema(User.prototype);

    expect(schema.id.name).toBe('USER_ID');
    expect(schema.name.name).toBe('USER_NAME');
  });
});
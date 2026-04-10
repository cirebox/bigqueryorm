import { FindOperator } from '../../lib/find-options/FindOperator';

describe('FindOperator', () => {
  it('should create a FindOperator with correct value', () => {
    const operator = new FindOperator('eq', 'John');
    expect(operator.type).toBe('eq');
    expect(operator.value).toBe('John');
  });

  it('should create an operator with nested value', () => {
    const operator = new FindOperator('in', [1, 2, 3]);
    expect(operator.type).toBe('in');
    expect(operator.value).toEqual([1, 2, 3]);
  });
});

describe('FindManyOptions', () => {
  it('should allow setting where conditions', () => {
    const { FindManyOptions } = require('../../lib/find-options');
    const options = new FindManyOptions<any>();
    options.where = { name: 'John' };

    expect(options.where).toBeDefined();
    expect((options.where as any).name).toBe('John');
  });

  it('should allow setting order options', () => {
    const { FindManyOptions } = require('../../lib/find-options');
    const options = new FindManyOptions<any>();
    options.order = { createdAt: 'DESC' };

    expect(options.order).toBeDefined();
    expect((options.order as any).createdAt).toBe('DESC');
  });

  it('should allow setting take (limit)', () => {
    const { FindManyOptions } = require('../../lib/find-options');
    const options = new FindManyOptions<any>();
    options.take = 10;

    expect(options.take).toBe(10);
  });

  it('should allow setting skip (offset)', () => {
    const { FindManyOptions } = require('../../lib/find-options');
    const options = new FindManyOptions<any>();
    options.skip = 20;

    expect(options.skip).toBe(20);
  });

  it('should allow combining all options', () => {
    const { FindManyOptions } = require('../../lib/find-options');
    const options = new FindManyOptions<any>();
    options.where = { isActive: true };
    options.order = { name: 'ASC' };
    options.take = 50;
    options.skip = 100;

    expect((options.where as any).isActive).toBe(true);
    expect((options.order as any).name).toBe('ASC');
    expect(options.take).toBe(50);
    expect(options.skip).toBe(100);
  });
});

describe('FindOneOptions', () => {
  it('should allow setting where conditions', () => {
    const { FindOneOptions } = require('../../lib/find-options');
    const options = new FindOneOptions<any>();
    options.where = { id: '123' };

    expect(options.where).toBeDefined();
    expect((options.where as any).id).toBe('123');
  });
});
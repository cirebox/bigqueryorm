import { SelectBuilder } from '../../lib/query-builder/SelectQueryBuilder';

describe('SelectBuilder', () => {
  let builder: SelectBuilder<any>;

  beforeEach(() => {
    builder = new SelectBuilder<any>('project.dataset.table');
  });

  describe('constructor', () => {
    it('should create a SelectBuilder with the correct tableId', () => {
      const b = new SelectBuilder<any>('my-project.my_dataset.my_table');
      expect((b as any).tableId).toBe('my-project.my_dataset.my_table');
    });
  });

  describe('where', () => {
    it('should add a single where condition', () => {
      builder.where('is_active = true');
      expect((builder as any).whereConditions).toContain('is_active = true');
    });

    it('should add multiple where conditions', () => {
      builder.where('status = "active"');
      builder.where('age > 18');
      expect((builder as any).whereConditions).toHaveLength(2);
      expect((builder as any).whereConditions[0]).toBe('status = "active"');
      expect((builder as any).whereConditions[1]).toBe('age > 18');
    });

    it('should return the builder for chaining', () => {
      const result = builder.where('id = 1');
      expect(result).toBe(builder);
    });
  });

  describe('orderBy', () => {
    it('should add a single order condition', () => {
      builder.orderBy('createdAt', 'DESC');
      expect((builder as any).orderConditions).toContain('createdAt DESC');
    });

    it('should add ASC order direction', () => {
      builder.orderBy('name', 'ASC');
      expect((builder as any).orderConditions).toContain('name ASC');
    });

    it('should return the builder for chaining', () => {
      const result = builder.orderBy('id', 'ASC');
      expect(result).toBe(builder);
    });
  });

  describe('limit', () => {
    it('should set the limit condition', () => {
      builder.limit(100);
      expect((builder as any).limitCondition).toBe(100);
    });

    it('should return the builder for chaining', () => {
      const result = builder.limit(50);
      expect(result).toBe(builder);
    });
  });

  describe('build', () => {
    it('should build a simple SELECT query', () => {
      const query = builder.build();
      expect(query).toBe('SELECT * FROM `project.dataset.table`');
    });

    it('should build query with WHERE clause', () => {
      builder.where('status = "active"');
      const query = builder.build();
      expect(query).toBe(
        'SELECT * FROM `project.dataset.table` WHERE status = "active"'
      );
    });

    it('should build query with multiple WHERE conditions joined by AND', () => {
      builder.where('status = "active"');
      builder.where('age > 18');
      const query = builder.build();
      expect(query).toBe(
        'SELECT * FROM `project.dataset.table` WHERE status = "active" AND age > 18'
      );
    });

    it('should build query with ORDER BY clause', () => {
      builder.orderBy('createdAt', 'DESC');
      const query = builder.build();
      expect(query).toBe(
        'SELECT * FROM `project.dataset.table` ORDER BY createdAt DESC'
      );
    });

    it('should build query with LIMIT clause', () => {
      builder.limit(10);
      const query = builder.build();
      expect(query).toBe('SELECT * FROM `project.dataset.table` LIMIT 10');
    });

    it('should build query with WHERE, ORDER BY and LIMIT', () => {
      builder.where('is_active = true');
      builder.orderBy('name', 'ASC');
      builder.limit(50);
      const query = builder.build();
      expect(query).toBe(
        'SELECT * FROM `project.dataset.table` WHERE is_active = true ORDER BY name ASC LIMIT 50'
      );
    });

    it('should build query with multiple ORDER BY conditions', () => {
      builder.orderBy('status', 'ASC');
      builder.orderBy('createdAt', 'DESC');
      const query = builder.build();
      expect(query).toBe(
        'SELECT * FROM `project.dataset.table` ORDER BY status ASC, createdAt DESC'
      );
    });

    it('should handle all clauses together', () => {
      builder
        .where('age > 18')
        .where('status = "active"')
        .orderBy('createdAt', 'DESC')
        .orderBy('name', 'ASC')
        .limit(25);

      const query = builder.build();
      expect(query).toBe(
        'SELECT * FROM `project.dataset.table` WHERE age > 18 AND status = "active" ORDER BY createdAt DESC, name ASC LIMIT 25'
      );
    });
  });
});
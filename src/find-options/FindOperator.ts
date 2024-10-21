export class FindOperator<ValueType> {
  constructor(
    public operator: '>' | '<' | '>=' | '<=' | '!=' | 'IN' | 'LIKE',
    public value: ValueType
  ) { }
}

// Exemplo de uso de operadores para buscas mais avançadas
export function MoreThan<T>(value: T): FindOperator<T> {
  return new FindOperator('>', value);
}

export function LessThan<T>(value: T): FindOperator<T> {
  return new FindOperator('<', value);
}

export function Like<T>(value: T): FindOperator<T> {
  return new FindOperator('LIKE', value);
}

export function In<T>(value: T[]): FindOperator<T[]> {
  return new FindOperator('IN', value);
}

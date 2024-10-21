import { FindOperator, FindOptionsWhere } from "../find-options";

export function WhereBuilder<Entity>(where?: FindOptionsWhere<Entity>): string {
  if (!where || Object.keys(where).length === 0) {
    return ''; // Sem condições, retorna string vazia
  }

  const conditions = Object.entries(where).map(([key, value]) => {
    if (value instanceof FindOperator) {
      // Se o valor for uma instância de FindOperator, usa o operador
      return `${key} ${value.operator} ${JSON.stringify(value.value)}`;
    } else {
      // Igualdade simples
      return `${key} = ${JSON.stringify(value)}`;
    }
  });

  return `WHERE ${conditions.join(' AND ')}`;
}

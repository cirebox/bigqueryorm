// utils/type-mapper.ts
export function mapTypeScriptTypeToBigQuery(type: string): string {
  switch (type.toLowerCase()) {
    case 'string':
      return 'STRING';
    case 'number':
      return 'FLOAT64';
    case 'boolean':
      return 'BOOL';
    case 'date':
      return 'DATE';
    default:
      throw new Error(`Tipo não suportado: ${type}`);
  }
}

import { FindOptionsWhere } from './FindOptionsWhere';

export interface FindManyOptions<Entity> {
  /**
   * Define a condição para os registros a serem encontrados.
   * Pode ser um objeto simples com propriedades ou uma estrutura mais complexa.
   */
  where?: FindOptionsWhere<Entity>;

  /**
   * Define a ordem dos registros a serem retornados.
   * As chaves do objeto são os nomes das colunas e os valores são 'ASC' (ascendente) ou 'DESC' (descendente).
   */
  order?: { [P in keyof Entity]?: 'ASC' | 'DESC' };

  /**
   * Define o número de registros a serem retornados (limite).
   */
  take?: number;

  /**
   * Define quantos registros devem ser ignorados antes de retornar os resultados (paginação).
   */
  skip?: number;
}

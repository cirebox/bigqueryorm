import { FindManyOptions } from './FindManyOptions';

export interface FindOneOptions<Entity> extends FindManyOptions<Entity> {
  /**
   * Define se a consulta deve falhar se nenhuma entidade for encontrada.
   */
  failOnNotFound?: boolean;
}

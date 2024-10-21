import { FindOperator } from "./FindOperator";

export type FindOptionsWhere<Entity> = {
  /**
   * Condições simples que devem ser aplicadas no `WHERE`.
   * Exemplo: { nome: "João" }
   */
  [P in keyof Entity]?: Entity[P] extends string
  ? string | FindOperator<Entity[P]>
  : Entity[P] | FindOperator<Entity[P]>;
};

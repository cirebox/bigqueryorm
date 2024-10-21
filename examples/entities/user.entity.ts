// entities/user.entity.ts
import { Column, Index, Table } from "../../src/decorators";

export interface IUser {
  id: string;
  name: string;
  age?: number;
  isActive?: boolean;
  createAt?: Date;
}

@Table({ name: 'user_table', suffix: 'months', datasetName: 'dataset_user', partitionBy: 'DATE(timestamp)', clusterBy: ['user_id'], description: 'Tabela de teste de integração' })
@Index('user_id', 'event_type')
export class User implements IUser {
  @Column({ name: 'USER_ID', type: 'STRING', mode: "REQUIRED" })
  id!: string;

  @Column({ name: 'USER_NAME', type: 'STRING', mode: "REQUIRED" })
  name!: string;

  @Column({ name: 'USER_AGE', type: 'FLOAT', mode: "NULLABLE", description: "IDADE" })
  age?: number;

  @Column({ name: 'USER_ACTIVE', type: 'BOOLEAN', mode: "NULLABLE" })
  isActive?: boolean;

  @Column({ name: 'USER_CREATEAT', type: 'DATE', mode: "NULLABLE" })
  createAt?: Date;
}

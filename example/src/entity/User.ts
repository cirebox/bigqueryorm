import {
  BQColumn,
  BQDataset,
  BQTable,
  FieldModeEnum,
  FieldTypeEnum,
} from 'bigquery-orm';

@BQDataset({
  name: 'user_test_dataset',
  suffix: 'year',
  description: 'Dados de usuário',
})
@BQTable({
  name: 'user_table',
  suffix: 'months',
  description: 'Usuários',
})
export class User {
  @BQColumn({
    name: 'id_user',
    type: FieldTypeEnum.TIMESTAMP,
    mode: FieldModeEnum.REQUIRED,
  })
  id?: string;

  @BQColumn({
    name: 'name_user',
    type: FieldTypeEnum.TIMESTAMP,
    mode: FieldModeEnum.REQUIRED,
  })
  name!: string;

  @BQColumn({
    name: 'email_user',
    type: FieldTypeEnum.TIMESTAMP,
    mode: FieldModeEnum.REQUIRED,
  })
  email!: string;

  @BQColumn({
    name: 'createat_user',
    type: FieldTypeEnum.TIMESTAMP,
    mode: FieldModeEnum.REQUIRED,
  })
  createdAt?: Date;
}

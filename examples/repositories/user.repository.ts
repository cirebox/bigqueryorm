// src/repositories/generic.repository.ts
import { User } from '../entities/user.entity';
import { Repository } from '../../src/repository';
import { ConnectionOrm } from '../../src';

export class UserRepositoryOrm extends Repository<User> {
  constructor(
    connection: ConnectionOrm,
    entity: User
  ) {
    super(connection, entity)
  }
}

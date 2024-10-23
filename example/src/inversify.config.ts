// src/inversify.config.ts
import { Container } from 'inversify';
import { User } from './entity/User';
import { Repository } from 'bigquery-orm';

const container = new Container();

// Registrar a injeção da classe Repository com a entidade User
container
  .bind<Repository<User>>(Repository)
  .toDynamicValue(() => new Repository<User>(new User));

export { container };

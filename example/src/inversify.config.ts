// src/inversify.config.ts
import { Container } from 'inversify';
import { Repository } from './repositories/Repository';
import { User } from './entity/User';

const container = new Container();

// Registrar a injeção da classe Repository com a entidade User
container.bind<Repository<User>>(Repository).toDynamicValue(() => new Repository(User));

export { container };

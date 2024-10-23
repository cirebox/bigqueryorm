// src/app.ts
import 'reflect-metadata';

import { UserService } from './services/UserService';
import { User } from './entity/User';
import { container } from './inversify.config';

async function main() {
  // Resolver o serviço do container
  const userService = container.resolve(UserService);

  // Criar um novo usuário
  const newUser: User = { id: '1', name: 'John Doe', email: 'john@example.com' };
  await userService.createUser(newUser);

  // Listar todos os usuários
  const users = await userService.findAllUsers();
  console.log('Users:', users);
}

main().catch(console.error);

import { injectable, inject } from 'inversify';

import { User } from '../entity/User';

@injectable()
export class UserService {
  constructor(@inject(Repository) private readonly userRepository: Repository<User>) { }

  async findAllUsers() {
    return await this.userRepository.find<User>({});
  }

  async createUser(user: User) {
    return await this.userRepository.insert(user);
  }
}

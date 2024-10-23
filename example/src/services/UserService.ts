import { injectable, inject } from 'inversify';
import { User } from '../entity/User';
import { Repository } from 'bigquery-orm';

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

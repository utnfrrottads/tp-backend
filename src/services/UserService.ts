import { getCustomRepository } from "typeorm";
import * as zod from "zod";
import EntityValidationError from "../errors/EntityValidationError";
import DatabaseError from "../errors/DatabaseError";
import { UserDTO } from "../entities/dto/UserDTO";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";
class UserService {
  private userSchema = zod.object({
    id: zod.number().optional().nullable(),
  });
  private userRepository = getCustomRepository(UserRepository);

  public async createOne(userDTO: UserDTO): Promise<UserDTO> {
    const user = User.fromDTO(userDTO);
    try {
      this.userSchema.parse(user);
    } catch (error) {
      throw new EntityValidationError(error);
    }
    delete user.id;
    try {
      return User.toDTO(await this.userRepository.save(user));
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}
export default UserService;

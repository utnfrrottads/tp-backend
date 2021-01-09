import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Contact } from "./Contact";
import { UserDTO } from "./dto/UserDTO";

@Entity()
export class User {
  static fromDTO(userDTO: UserDTO): User {
    const user = new User();
    user.id = userDTO.id;
    return user;
  }
  static toDTO(user: User): UserDTO {
    return { ...user };
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @OneToMany((type) => Contact, (contact) => contact.user)
  contacts?: Contact[];
}

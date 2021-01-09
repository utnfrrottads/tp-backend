import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ContactDTO } from "./dto/ContactDTO";
import { User } from "./User";

@Entity()
export class Contact {
  static fromDTO(contactDTO: ContactDTO): Contact {
    const contact = new Contact();
    contact.id = contactDTO.id;
    contact.user = User.fromDTO({ id: contactDTO.userId });
    contact.firstName = contactDTO.firstName;
    contact.lastName = contactDTO.lastName;
    contact.company = contactDTO.company;
    contact.profileImage = contactDTO.profileImage;
    contact.email = contactDTO.email;
    contact.birthdate = contactDTO.birthdate
      ? new Date(contactDTO.birthdate!)
      : undefined;
    contact.workPhone = contactDTO.workPhone;
    contact.personalPhone = contactDTO.personalPhone;
    contact.address = contactDTO.address;
    contact.state = contactDTO.state;
    contact.city = contactDTO.city;
    return contact;
  }
  static toDTO(contact: Contact): ContactDTO {
    const { user, ...dto } = {
      ...contact,
      userId: contact.user?.id,
      birthdate: contact.birthdate?.toISOString(),
    };
    return dto;
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column({ nullable: true })
  company?: string;

  @Column({ nullable: true })
  profileImage?: string;

  @Column()
  email?: string;

  @Column()
  birthdate?: Date;

  @Column()
  workPhone?: string;

  @Column({ nullable: true })
  personalPhone?: string;

  @Column()
  address?: string;

  @Column()
  state?: string;

  @Column()
  city?: string;

  @ManyToOne((type) => User, (user) => user.contacts)
  user?: User;
}

import { DeleteResult, getCustomRepository, Not } from "typeorm";
import { Contact } from "../entities/Contact";
import ContactRepository from "../repositories/ContactRepository";
import * as zod from "zod";
import { ContactDTO } from "../entities/dto/ContactDTO";
import { SearchQueryDTO } from "../entities/dto/SearchQueryDTO";
import { SearchResultDTO } from "../entities/dto/SearchResultDTO";
import fromSearchQueryDTO from "../helpers/fromSearchQueryDTO";
import getFindOptions from "../helpers/getFindOptions";
import EntityValidationError from "../errors/EntityValidationError";
import DatabaseError from "../errors/DatabaseError";
import stripObject from "../helpers/getStrippedObject";
class ContactService {
  private contactSchema = zod.object({
    id: zod.number().nullable().optional(),
    firstName: zod.string().nonempty(),
    lastName: zod.string().nonempty(),
    company: zod.string().nullable().optional(),
    profileImage: zod.string().url().nullable().optional(),
    email: zod.string().email(),
    birthdate: zod.date(),
    workPhone: zod.string().nonempty(),
    personalPhone: zod.string().nullable().optional(),
    address: zod.string().nonempty(),
    state: zod.string().nonempty(),
    city: zod.string().nonempty(),
    user: zod.object({ id: zod.number() }),
  });

  private contactRepository = getCustomRepository(ContactRepository);

  public async createOne(contactDTO: ContactDTO): Promise<ContactDTO> {
    const contact = Contact.fromDTO(contactDTO);
    try {
      this.contactSchema.parse(contact);
    } catch (error) {
      throw new EntityValidationError(error);
    }
    delete contact.id;
    try {
      return Contact.toDTO(await this.contactRepository.save(contact));
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  public async createMany(contactDTOs: ContactDTO[]): Promise<ContactDTO[]> {
    let contacts = contactDTOs.map((contactDTO) => Contact.fromDTO(contactDTO));
    try {
      contacts.forEach((contact) => this.contactSchema.parse(contact));
    } catch (error) {
      throw new EntityValidationError(error);
    }
    contacts = contacts.map((contact) => {
      delete contact.id;
      return contact;
    });
    let results;
    try {
      results = await this.contactRepository.save(contacts);
    } catch (error) {
      throw new DatabaseError(error);
    }
    return results.map((result) => Contact.toDTO(result));
  }
  public async updateOne(contactDTO: ContactDTO): Promise<ContactDTO> {
    const contact = Contact.fromDTO(contactDTO);
    let savedContact;
    try {
      savedContact = await this.contactRepository.findOne(contactDTO.id);
    } catch (error) {
      throw new DatabaseError(error);
    }
    if (!savedContact) throw new Error();
    try {
      this.contactSchema.parse(contact);
    } catch (error) {
      throw new EntityValidationError(error);
    }
    try {
      return Contact.toDTO(await this.contactRepository.save(contact));
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  public async deleteOne(
    userId: number,
    contactId: number
  ): Promise<DeleteResult> {
    let savedContact;
    try {
      savedContact = await this.contactRepository.findOne({
        where: stripObject(Contact.fromDTO({ id: contactId, userId })),
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
    if (!savedContact) throw new Error();
    try {
      return this.contactRepository.delete({ id: contactId });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  public async findOne(contactDTO: ContactDTO): Promise<ContactDTO | null> {
    const contact = Contact.fromDTO(contactDTO);
    let result;
    try {
      result = await this.contactRepository.findOne({
        where: stripObject(contact),
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
    return result ? Contact.toDTO(result) : null;
  }

  public async search(
    query: SearchQueryDTO<ContactDTO>,
    userId?: number
  ): Promise<SearchResultDTO<ContactDTO>> {
    let where: ContactDTO = fromSearchQueryDTO<ContactDTO>(query);

    //Add the "same" query for searching for common fields of another Contact

    /* 
    /  Could have been done with something like
    /  "select c1.* from contact c1 inner join contact c2 on c2.id=624 and c2.state=c1.state..."
    /  using typeorm's query builder, to be more performant.
    */
    if (query.same?.id) {
      let savedContact: ContactDTO;
      try {
        savedContact = Contact.toDTO(
          await this.contactRepository.findOneOrFail(query.same.id)
        );
      } catch (error) {
        throw new DatabaseError(error);
      }
      let sameQuery: any = {};
      query.same.keys.forEach((key) => (sameQuery[key] = savedContact[key]));
      where = { ...sameQuery, ...where };
    }
    //If param userId is present limit only to results with the same userId
    if (userId) {
      where = { ...where, userId };
    }

    const findOptions = getFindOptions(
      Contact.fromDTO(where),
      query.limit,
      query.skip
    );
    let total;
    try {
      total = await this.contactRepository.count({
        where: findOptions.where,
      });
    } catch (error) {
      throw new DatabaseError(error);
    }

    //If "same" search option included, exclude the original contact
    if (query?.same?.id) {
      findOptions.where.id = Not(query.same.id);
    }

    let result;
    try {
      result = await this.contactRepository.find(findOptions);
    } catch (error) {
      throw new DatabaseError(error);
    }
    return {
      limit: findOptions.take,
      skip: query.skip,
      total,
      items: result.map((result) => Contact.toDTO(result)),
    };
  }
}
export default ContactService;

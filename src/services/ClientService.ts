import { getRepository } from 'typeorm';
import { Client } from '../entities/Client';
import stripObject from '../helpers/stripObject';

export class ClientService {
  private clientRepository = getRepository(Client);

  public async findById(id: number) {
    return this.clientRepository.findOne(id);
  }
  public async existsById(id: number) {
    return (await this.clientRepository.count({ where: { id } })) === 1;
  }
  public async find(where: Client) {
    return this.clientRepository.find({ where: stripObject(where) });
  }
  public async deleteById(id: number) {
    return this.clientRepository.delete(id);
  }
  public async update(id: number, client: Client) {
    return this.clientRepository.update(id, client);
  }
  public async create(client: Client) {
    return this.clientRepository.save(client);
  }
}

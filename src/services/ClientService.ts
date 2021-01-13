import { getRepository } from 'typeorm';
import { Client } from '../entities/Client';
import stripObject from '../helpers/stripObject';

export class ClientService {
  private clientRepository = getRepository(Client);

  public findById(id: number) {
    return this.clientRepository.findOne(id);
  }
  public find(where: Client) {
    return this.clientRepository.find({ where: stripObject(where) });
  }
  public deleteById(id: number) {
    return this.clientRepository.delete(id);
  }
  public update(id: number, client: Client) {
    return this.clientRepository.update(id, client);
  }
  public create(client: Client) {
    return this.clientRepository.save(client);
  }
}

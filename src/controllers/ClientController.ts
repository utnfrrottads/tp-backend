import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams,
} from 'routing-controllers';
import { Client } from '../entities/Client';
import EntityNotFoundError from '../errors/EntityNotFoundError';
import { ClientService } from '../services/ClientService';

@JsonController('/clients')
export class ClientController {
  private clientService = new ClientService();

  @Get('/')
  public async getAll(@QueryParams() query: Client) {
    return this.clientService.find(query);
  }

  @Get('/:id')
  public async getOne(@Param('id') id: number) {
    const client = await this.clientService.findById(id);
    if (!client) throw new EntityNotFoundError();
    return client;
  }

  @Post('/')
  public async post(@Body() client: Client) {
    delete client.id;
    return await this.clientService.create(client);
  }

  @Put('/:id')
  public async put(@Param('id') id: number, @Body() client: Client) {
    if (!this.clientService.existsById(id)) throw new EntityNotFoundError();
    const safeEntity = { ...client, id };
    return this.clientService.update(id, safeEntity);
  }

  @Delete('/:id')
  public async remove(@Param('id') id: number) {
    if (!this.clientService.existsById(id)) throw new EntityNotFoundError();
    return this.clientService.deleteById(id);
  }
}

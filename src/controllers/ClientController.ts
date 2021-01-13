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
import { ClientService } from '../services/ClientService';

@JsonController('/clients')
export class ClientController {
  private clientService = new ClientService();

  @Get('/')
  getAll(@QueryParams() query: Client) {
    return this.clientService.find(query);
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.clientService.findById(id);
  }

  @Post('/')
  async post(@Body() client: Client) {
    delete client.id;
    return await this.clientService.create(client);
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() client: Client) {
    const safeEntity = { ...client, id };
    return this.clientService.update(id, safeEntity);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.clientService.deleteById(id);
  }
}

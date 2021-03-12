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
import { Prize } from '../entities/Prize';
import EntityNotFoundError from '../errors/EntityNotFoundError';
import { ClientService } from '../services/ClientService';
import { PrizeService } from '../services/PrizeService';

@JsonController('/prizes')
export class PrizeController {
  private prizeService = new PrizeService();
  private clientService = new ClientService();

  @Get('/')
  public async getAll(@QueryParams() query: Prize) {
    return this.prizeService.find(query);
  }

  @Get('/:id')
  public async getOne(@Param('id') id: number) {
    const prize = await this.prizeService.findById(id);
    if (!prize) throw new EntityNotFoundError();
    return prize;
  }

  @Get('/find-by-name/:partial')
  public async findByPartialName(@Param('partial') partial: string) {
    const prizes = await this.prizeService.findByPartialName(partial);
    return prizes;
  }

  @Get('/available-for-client/:clientId')
  public async findAvailablePrizes(@Param('clientId') clientId: number) {
    const client = await this.clientService.findById(clientId);
    if (!client) throw new EntityNotFoundError();
    const prizes = await this.prizeService.findByPointPriceLessOrEqual(
      client.points!
    );
    return prizes;
  }

  @Post('/')
  public async post(@Body() prize: Prize) {
    delete prize.id;
    return await this.prizeService.create(prize);
  }

  @Put('/:id')
  public async put(@Param('id') id: number, @Body() prize: Prize) {
    if (!this.prizeService.existsById(id)) throw new EntityNotFoundError();
    const safeEntity = { ...prize, id };
    return this.prizeService.update(id, safeEntity);
  }

  @Delete('/:id')
  public async remove(@Param('id') id: number) {
    if (!this.prizeService.existsById(id)) throw new EntityNotFoundError();
    return this.prizeService.deleteById(id);
  }
}

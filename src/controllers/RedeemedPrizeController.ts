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
import { RedeemedPrize } from '../entities/RedeemedPrize';
import EntityNotFoundError from '../errors/EntityNotFoundError';
import { RedeemedPrizeService } from '../services/RedeemedPrizeService';

@JsonController('/clients/:clientId/redeemed-prizes')
export class RedeemedPrizeController {
  private redeemedPrizeService = new RedeemedPrizeService();

  @Get('/')
  public async getAll(
    @Param('clientId') clientId: number,
    @QueryParams() query: Client
  ) {
    return this.redeemedPrizeService.find(query, clientId);
  }

  @Get('/not-delivered')
  public async getNotDelivered(
    @Param('clientId') clientId: number,
  ) {
    return this.redeemedPrizeService.find({delivered:false}, clientId);
  }

  @Get('/:id')
  public async getOne(
    @Param('clientId') clientId: number,
    @Param('id') id: number
  ) {
    const client = await this.redeemedPrizeService.findByIdAndClientId(
      id,
      clientId
    );
    if (!client) throw new EntityNotFoundError();
    return client;
  }

  @Post('/')
  public async post(
    @Param('clientId') clientId: number,
    @Body() redeemedPrize: RedeemedPrize
  ) {
    delete redeemedPrize.id;
    return await this.redeemedPrizeService.createByIdAndClientId(
      redeemedPrize,
      clientId
    );
  }

  @Put('/:id')
  public async put(
    @Param('clientId') clientId: number,
    @Param('id') id: number,
    @Body() redeemedPrize: RedeemedPrize
  ) {
    if (!this.redeemedPrizeService.existsByIdAndClientId(id, clientId))
      throw new EntityNotFoundError();
    const safeEntity = { ...redeemedPrize, id };
    return this.redeemedPrizeService.updateByIdAndClientId(
      id,
      clientId,
      safeEntity
    );
  }

  @Delete('/:id')
  public async remove(
    @Param('clientId') clientId: number,
    @Param('id') id: number
  ) {
    if (!this.redeemedPrizeService.existsByIdAndClientId(id, clientId))
      throw new EntityNotFoundError();
    return this.redeemedPrizeService.deleteByIdAndClientId(id, clientId);
  }
}
